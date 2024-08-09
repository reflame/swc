use serde::{Deserialize, Deserializer, Serialize};
use swc_common::DUMMY_SP;
use swc_ecma_ast::*;
use swc_ecma_quote_macros::internal_quote;
use swc_ecma_visit::{as_folder, Fold, VisitMut, VisitMutWith};

#[cfg(test)]
mod tests;

pub fn refresh_setup(pathname_scoped: String) -> impl Fold + VisitMut {
    as_folder(RefreshSetup { pathname_scoped })
}

#[derive(Clone)]
struct RefreshSetup {
    pub pathname_scoped: String,
}

impl VisitMut for RefreshSetup {
    fn visit_mut_module_items(&mut self, module_items: &mut Vec<ModuleItem>) {
        let pathname = &self.pathname_scoped;

        // Intuitively this feels like it should be faster than individual .inserts
        // TODO: benchmark if doing individual inserts makes a difference?
        let statements_before = [
            ModuleItem::Stmt(internal_quote!(
                r#"
            import.meta.url = new URL($pathname, location.origin)"# as Stmt,
                pathname = Ident::new_no_ctxt(format!("\"{pathname}\"",).into(), DUMMY_SP),
            )),
            ModuleItem::Stmt(internal_quote!(
                r#"
            const $reflamePathname = new URL(import.meta.url).pathname"# as Stmt
            )),
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
              const fullId = $reflamePathname + ` ${id}`;
              self.$reflame.reactRefreshRuntime.register(type, fullId)
            }
            "# as Stmt
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
            pathname: $reflamePathname,
            callback: ({ pathname, id }) => {
                if (id) {
                console.debug("accepting", pathname, "to", id)
                } else {
                console.debug("accepting", pathname)
                }

                self.$reflame.performReactRefresh()
            },
        })"# as Stmt
        )));
    }
}
