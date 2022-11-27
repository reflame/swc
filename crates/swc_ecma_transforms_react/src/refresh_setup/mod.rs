use swc_common::DUMMY_SP;
use swc_ecma_ast::*;
use swc_ecma_visit::{as_folder, Fold, VisitMut, VisitMutWith};

#[cfg(test)]
mod tests;

pub fn refresh_setup(pathname: String) -> impl Fold + VisitMut {
    as_folder(RefreshSetup { pathname })
}

#[derive(Clone)]
struct RefreshSetup {
    pathname: String,
}

impl VisitMut for RefreshSetup {
    // Implement necessary visit_mut_* methods for actual custom transform.
    // A comprehensive list of possible visitor methods can be found here:
    // https://rustdoc.swc.rs/swc_ecma_visit/trait.VisitMut.html
    fn visit_mut_module_items(&mut self, module_items: &mut Vec<ModuleItem>) {
        module_items.visit_mut_children_with(self);

        // Intuitively this feels like it should be faster than individual .inserts
        // TODO: benchmark if doing individual inserts makes a difference?
        let statements_before = [
            ModuleItem::Stmt(Stmt::Decl(Decl::Var(Box::new(VarDecl {
                span: DUMMY_SP,
                kind: VarDeclKind::Const,
                decls: [VarDeclarator {
                    span: DUMMY_SP,
                    init: Some(Box::new(Expr::Member(MemberExpr {
                        span: DUMMY_SP,
                        obj: Box::new(Expr::Ident(Ident {
                            span: DUMMY_SP,
                            optional: false,
                            sym: "self".into(),
                        })),
                        prop: MemberProp::Ident(Ident {
                            span: DUMMY_SP,
                            optional: false,
                            sym: "$RefreshReg$".into(),
                        }),
                    }))),
                    name: Pat::Expr(Box::new(Expr::Ident(Ident {
                        span: DUMMY_SP,
                        optional: false,
                        sym: "$reflamePreviousRefreshReg".into(),
                    }))),
                    definite: false,
                }]
                .to_vec(),
                declare: false,
            })))),
            //             ModuleItem::Stmt(quote!(
            //                 r#"
            // const $reflamePreviousRefreshSig = self.$RefreshSig$"# as Stmt
            //             )),
            //             ModuleItem::Stmt(quote!(
            //                 r#"
            // self.$RefreshReg$ = (type, id) => {
            //   const fullId = $pathname + " " + id;
            //   self.$reflame.reactRefreshRuntime.register(type, fullId)
            // }
            // "# as Stmt,
            //                 pathname = Ident::new(
            //                     format!("\"{pathname}\"", pathname = self.pathname).into(),
            //                     DUMMY_SP
            //                 ),
            //             )),
            //             ModuleItem::Stmt(quote!(
            //                 r#"
            // self.$RefreshSig$ =
            // self.$reflame.reactRefreshRuntime.createSignatureFunctionForTransform"#
            //                     as Stmt
            //             )),
        ];
        module_items.splice(0..0, statements_before);

        //         module_items.push(ModuleItem::Stmt(quote!(
        //             r#"
        // self.$RefreshReg$ = $reflamePreviousRefreshReg"# as Stmt
        //         )));
        //         module_items.push(ModuleItem::Stmt(quote!(
        //             r#"
        // self.$RefreshSig$ = $reflamePreviousRefreshSig"# as Stmt
        //         )));
        //         module_items.push(ModuleItem::Stmt(quote!(
        //             r#"
        // self.$reflame.registerAcceptCallback({
        //     pathname: $pathname,
        //     callback: ({ pathname, resourceId }) => {
        //         if (resourceId) {
        //         console.debug('accepting', pathname, 'to', resourceId)
        //         } else {
        //         console.debug('accepting', pathname)
        //         }

        //         self.$reflame.performReactRefresh()
        //     },
        // })"# as Stmt,
        //             pathname = Ident::new(
        //                 format!("\"{pathname}\"", pathname =
        // self.pathname).into(),                 DUMMY_SP
        //             ),
        //         )));
    }
}
