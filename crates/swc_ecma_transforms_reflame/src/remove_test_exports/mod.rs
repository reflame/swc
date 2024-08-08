use serde::{Deserialize, Deserializer, Serialize};
use swc_common::util::take::Take;
use swc_ecma_ast::*;
use swc_ecma_visit::{as_folder, Fold, VisitMut, VisitMutWith};

#[cfg(test)]
mod tests;

pub fn remove_test_exports() -> impl Fold + VisitMut {
    as_folder(RemoveTestExports {})
}

#[derive(Clone)]
struct RemoveTestExports {}

impl VisitMut for RemoveTestExports {
    fn visit_mut_module_items(&mut self, module_items: &mut Vec<ModuleItem>) {
        // FIXME: this indescriminately removes all top-level assignments to vars
        // ending with _test, whether or not they're actually exported as tests
        module_items.retain_mut(|module_item| match module_item {
            ModuleItem::Stmt(Stmt::Expr(ExprStmt { expr, .. })) => match &**expr {
                Expr::Assign(AssignExpr {
                    op: AssignOp::Assign,
                    left: AssignTarget::Simple(target),
                    ..
                }) => match target {
                    SimpleAssignTarget::Member(MemberExpr { obj, .. }) => match &**obj {
                        Expr::Ident(Ident { sym, .. }) => !sym.ends_with("_test"),
                        _ => true,
                    },
                    SimpleAssignTarget::Ident(BindingIdent {
                        id: Ident { sym, .. },
                        ..
                    }) => !sym.ends_with("_test"),
                    _ => true,
                },
                _ => true,
            },
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
