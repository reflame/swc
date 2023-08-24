use serde::{Deserialize, Deserializer, Serialize};
use swc_common::util::take::Take;
use swc_ecma_ast::*;
use swc_ecma_visit::{as_folder, Fold, VisitMut, VisitMutWith};

#[cfg(test)]
mod tests;

pub fn remove_test_exports(dev: bool, options: Option<bool>) -> impl Fold + VisitMut {
    as_folder(RemoveTestExports {
        enable: dev && matches!(options, Some(true)),
    })
}

#[derive(Clone)]
struct RemoveTestExports {
    enable: bool,
}

impl VisitMut for RemoveTestExports {
    // fn visit_mut_decl(&mut self, decl: &Decl) {
    //     match decl {
    //         Decl::ModuleDeclModuleDecl::ExportNamed(decl) => {
    //             self.forced_es6 = true;
    //         }
    //         _ => {}
    //     }

    //     // match stmt {
    //     //     Stmt::Decl(Decl::ModuleDecl)
    //     //     Stmt::Decl(Decl::Var(var)) => {
    //     //         if var.decls.len() == 1 {
    //     //             match &var.decls[0].name {
    //     //                 Pat::Ident(i) => {
    //     //                     if (&*i.sym).ends_with("_test") {
    //     //                         stmt.take();
    //     //                     }
    //     //                 }
    //     //                 _ => {}
    //     //             }
    //     //         }
    //     //     }
    //     //     _ => {}
    //     // }
    // }

    // fn visit_mut_stmts(&mut self, stmts: &mut Vec<Stmt>) {
    //     stmts.visit_mut_children_with(self);

    //     // We do same thing here.
    //     stmts.retain(|stmt| !matches!(stmt, Stmt::Empty(..)));
    // }

    fn visit_mut_module_items(&mut self, module_items: &mut Vec<ModuleItem>) {
        // module_items.visit_mut_children_with(self);
        if !self.enable {
            return;
        }

        // We do same thing here.
        module_items.retain_mut(|module_item| match module_item {
            ModuleItem::ModuleDecl(ModuleDecl::ExportDecl(ExportDecl {
                decl: Decl::Var(var),
                ..
            })) => {
                var.decls.retain_mut(|var_declarator| match var_declarator {
                    VarDeclarator {
                        name:
                            Pat::Ident(BindingIdent {
                                id: Ident { sym, .. },
                                ..
                            }),
                        ..
                    } => !sym.ends_with("_test"),
                    _ => true,
                });

                !var.decls.is_empty()
            }
            ModuleItem::ModuleDecl(ModuleDecl::ExportNamed(NamedExport { specifiers, .. })) => {
                specifiers.retain_mut(|specifier| match specifier {
                    ExportSpecifier::Named(ExportNamedSpecifier { orig, exported, .. }) => {
                        let has_test_postfix = match exported {
                            Some(ModuleExportName::Ident(Ident { sym, .. })) => {
                                sym.ends_with("_test")
                            }
                            Some(ModuleExportName::Str(Str { value, .. })) => {
                                value.ends_with("_test")
                            }
                            _ => false,
                        } || match orig {
                            ModuleExportName::Ident(Ident { sym, .. }) => sym.ends_with("_test"),
                            ModuleExportName::Str(Str { value, .. }) => value.ends_with("_test"),
                        };
                        !has_test_postfix
                    }
                    _ => true,
                });
                !specifiers.is_empty()
            }
            _ => true,
        });
    }
}
