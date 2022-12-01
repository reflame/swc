use serde::{Deserialize, Deserializer, Serialize};
use swc_common::DUMMY_SP;
use swc_ecma_ast::*;
use swc_ecma_quote_macros::internal_quote;
use swc_ecma_visit::{as_folder, Fold, VisitMut, VisitMutWith};
#[derive(Debug, Default, Clone, Serialize, Deserialize, Eq, PartialEq)]
#[serde(rename_all = "camelCase")]
#[serde(deny_unknown_fields)]
pub struct RefreshSetupOptions {
    pub pathname: Option<String>,
}

#[derive(Deserialize)]
#[serde(untagged)]
enum BoolOrRefreshSetup {
    Bool(bool),
    RefreshSetup(RefreshSetupOptions),
}
pub fn deserialize_refresh_setup<'de, D>(
    deserializer: D,
) -> Result<Option<RefreshSetupOptions>, D::Error>
where
    D: Deserializer<'de>,
{
    match BoolOrRefreshSetup::deserialize(deserializer)? {
        BoolOrRefreshSetup::RefreshSetup(refresh_setup) => Ok(Some(refresh_setup)),
        BoolOrRefreshSetup::Bool(true) => Ok(None),
        BoolOrRefreshSetup::Bool(false) => Ok(None),
    }
}

#[cfg(test)]
mod tests;

pub fn refresh_setup(dev: bool, options: Option<RefreshSetupOptions>) -> impl Fold + VisitMut {
    as_folder(RefreshSetup {
        enable: dev && options.is_some(),
        options: options.unwrap_or_default(),
    })
}

#[derive(Clone)]
struct RefreshSetup {
    enable: bool,
    options: RefreshSetupOptions,
}

impl VisitMut for RefreshSetup {
    // Implement necessary visit_mut_* methods for actual custom transform.
    // A comprehensive list of possible visitor methods can be found here:
    // https://rustdoc.swc.rs/swc_ecma_visit/trait.VisitMut.html
    fn visit_mut_module_items(&mut self, module_items: &mut Vec<ModuleItem>) {
        if !self.enable {
            return;
        }

        module_items.visit_mut_children_with(self);

        let pathname = match &self.options.pathname {
            Some(_) => self.options.pathname.as_ref().unwrap(),
            None => {
                panic!("wrong pathname")
            }
        };

        // Intuitively this feels like it should be faster than individual .inserts
        // TODO: benchmark if doing individual inserts makes a difference?
        let statements_before = [
            ModuleItem::Stmt(internal_quote!(
                r#"
            const $reflamePreviousRefreshReg = self.$RefreshReg$"# as Stmt
            )),
            ModuleItem::Stmt(internal_quote!(
                r#"
            const $reflamePreviousRefreshSig = self.$RefreshSig$"# as Stmt
            )),
            ModuleItem::Stmt(internal_quote!(
                r#"
            self.$RefreshReg$ = (type, id) => {
              const fullId = $pathname + ` ${id}`;
              self.$reflame.reactRefreshRuntime.register(type, fullId)
            }
            "# as Stmt,
                pathname = Ident::new(format!("\"{pathname}\"",).into(), DUMMY_SP),
            )),
            ModuleItem::Stmt(internal_quote!(
                r#"
            self.$RefreshSig$ =
            self.$reflame.reactRefreshRuntime.createSignatureFunctionForTransform"#
                    as Stmt
            )),
        ];
        module_items.splice(0..0, statements_before);

        module_items.push(ModuleItem::Stmt(internal_quote!(
            r#"
        self.$RefreshReg$ = $reflamePreviousRefreshReg"# as Stmt
        )));
        module_items.push(ModuleItem::Stmt(internal_quote!(
            r#"
        self.$RefreshSig$ = $reflamePreviousRefreshSig"# as Stmt
        )));
        module_items.push(ModuleItem::Stmt(internal_quote!(
            r#"
        self.$reflame.registerAcceptCallback({
            pathname: $pathname,
            callback: ({ pathname, resourceId }) => {
                if (resourceId) {
                console.debug("accepting", pathname, "to", resourceId)
                } else {
                console.debug("accepting", pathname)
                }

                self.$reflame.performReactRefresh()
            },
        })"# as Stmt,
            pathname = Ident::new(format!("\"{pathname}\"").into(), DUMMY_SP),
        )));
    }
}
