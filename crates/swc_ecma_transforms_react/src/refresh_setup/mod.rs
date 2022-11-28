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
                    name: Pat::Expr(Box::new(Expr::Ident(Ident {
                        span: DUMMY_SP,
                        optional: false,
                        sym: "$reflamePreviousRefreshReg".into(),
                    }))),
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
                    definite: false,
                }]
                .to_vec(),
                declare: false,
            })))),
            ModuleItem::Stmt(Stmt::Decl(Decl::Var(Box::new(VarDecl {
                span: DUMMY_SP,
                kind: VarDeclKind::Const,
                decls: [VarDeclarator {
                    span: DUMMY_SP,
                    name: Pat::Expr(Box::new(Expr::Ident(Ident {
                        span: DUMMY_SP,
                        optional: false,
                        sym: "$reflamePreviousRefreshSig".into(),
                    }))),
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
                            sym: "$RefreshSig$".into(),
                        }),
                    }))),
                    definite: false,
                }]
                .to_vec(),
                declare: false,
            })))),
            ModuleItem::Stmt(Stmt::Expr(ExprStmt {
                span: DUMMY_SP,
                expr: Box::new(Expr::Assign(AssignExpr {
                    span: DUMMY_SP,
                    op: op!("="),
                    left: PatOrExpr::Expr(Box::new(Expr::Member(MemberExpr {
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
                    right: Box::new(Expr::Arrow(ArrowExpr {
                        span: DUMMY_SP,
                        params: vec![
                            Pat::Ident(BindingIdent {
                                id: Ident {
                                    span: DUMMY_SP,
                                    optional: false,
                                    sym: "type".into(),
                                },
                                type_ann: None,
                            }),
                            Pat::Ident(BindingIdent {
                                id: Ident {
                                    span: DUMMY_SP,
                                    optional: false,
                                    sym: "id".into(),
                                },
                                type_ann: None,
                            }),
                        ],
                        is_async: false,
                        is_generator: false,
                        type_params: None,
                        return_type: None,
                        body: BlockStmtOrExpr::BlockStmt(BlockStmt {
                            span: DUMMY_SP,
                            stmts: vec![
                                Stmt::Decl(Decl::Var(Box::new(VarDecl {
                                    span: DUMMY_SP,
                                    kind: VarDeclKind::Const,
                                    declare: false,
                                    decls: vec![VarDeclarator {
                                        span: DUMMY_SP,
                                        name: Pat::Expr(Box::new(Expr::Ident(Ident {
                                            span: DUMMY_SP,
                                            optional: false,
                                            sym: "fullId".into(),
                                        }))),
                                        init: Some(Box::new(Expr::Tpl(Tpl {
                                            span: DUMMY_SP,
                                            exprs: vec![Box::new(Expr::Ident(Ident {
                                                span: DUMMY_SP,
                                                optional: false,
                                                sym: "id".into(),
                                            }))],
                                            quasis: vec![
                                                TplElement {
                                                    span: DUMMY_SP,
                                                    tail: false,
                                                    cooked: Some("/test.js ".into()),
                                                    raw: "/test.js ".into(),
                                                },
                                                TplElement {
                                                    span: DUMMY_SP,
                                                    tail: true,
                                                    cooked: Some("".into()),
                                                    raw: "".into(),
                                                },
                                            ],
                                        }))),
                                        definite: false,
                                    }],
                                }))),
                                Stmt::Expr(ExprStmt {
                                    span: DUMMY_SP,
                                    expr: Box::new(Expr::Call(CallExpr {
                                        span: DUMMY_SP,
                                        callee: Callee::Expr(Box::new(Expr::Member(MemberExpr {
                                            span: DUMMY_SP,
                                            obj: Box::new(Expr::Member(MemberExpr {
                                                span: DUMMY_SP,
                                                obj: Box::new(Expr::Member(MemberExpr {
                                                    span: DUMMY_SP,
                                                    obj: Box::new(Expr::Ident(Ident {
                                                        span: DUMMY_SP,
                                                        optional: false,
                                                        sym: "self".into(),
                                                    })),
                                                    prop: MemberProp::Ident(Ident {
                                                        span: DUMMY_SP,
                                                        optional: false,
                                                        sym: "$reflame".into(),
                                                    }),
                                                })),
                                                prop: MemberProp::Ident(Ident {
                                                    span: DUMMY_SP,
                                                    optional: false,
                                                    sym: "reactRefreshRuntime".into(),
                                                }),
                                            })),
                                            prop: MemberProp::Ident(Ident {
                                                span: DUMMY_SP,
                                                optional: false,
                                                sym: "register".into(),
                                            }),
                                        }))),
                                        args: vec![
                                            ExprOrSpread {
                                                spread: None,
                                                expr: Box::new(Expr::Ident(Ident {
                                                    span: DUMMY_SP,
                                                    optional: false,
                                                    sym: "type".into(),
                                                })),
                                            },
                                            ExprOrSpread {
                                                spread: None,
                                                expr: Box::new(Expr::Ident(Ident {
                                                    span: DUMMY_SP,
                                                    optional: false,
                                                    sym: "fullId".into(),
                                                })),
                                            },
                                        ],
                                        type_args: None,
                                    })),
                                }),
                            ],
                        }),
                    })),
                })),
            })),
            ModuleItem::Stmt(Stmt::Expr(ExprStmt {
                span: DUMMY_SP,
                expr: Box::new(Expr::Assign(AssignExpr {
                    span: DUMMY_SP,
                    op: op!("="),
                    left: PatOrExpr::Expr(Box::new(Expr::Member(MemberExpr {
                        span: DUMMY_SP,
                        obj: Box::new(Expr::Ident(Ident {
                            span: DUMMY_SP,
                            optional: false,
                            sym: "self".into(),
                        })),
                        prop: MemberProp::Ident(Ident {
                            span: DUMMY_SP,
                            optional: false,
                            sym: "$RefreshSig$".into(),
                        }),
                    }))),
                    right: Box::new(Expr::Member(MemberExpr {
                        span: DUMMY_SP,
                        obj: Box::new(Expr::Member(MemberExpr {
                            span: DUMMY_SP,
                            obj: Box::new(Expr::Member(MemberExpr {
                                span: DUMMY_SP,
                                obj: Box::new(Expr::Ident(Ident {
                                    span: DUMMY_SP,
                                    optional: false,
                                    sym: "self".into(),
                                })),
                                prop: MemberProp::Ident(Ident {
                                    span: DUMMY_SP,
                                    optional: false,
                                    sym: "$reflame".into(),
                                }),
                            })),
                            prop: MemberProp::Ident(Ident {
                                span: DUMMY_SP,
                                optional: false,
                                sym: "reactRefreshRuntime".into(),
                            }),
                        })),
                        prop: MemberProp::Ident(Ident {
                            span: DUMMY_SP,
                            optional: false,
                            sym: "createSignatureFunctionForTransform".into(),
                        }),
                    })),
                })),
            })),
            /*             ModuleItem::Stmt(quote!(
             *                 r#"
             * const $reflamePreviousRefreshSig = self.$RefreshSig$"# as Stmt
             *             )),
             *             ModuleItem::Stmt(quote!(
             *                 r#"
             * self.$RefreshReg$ = (type, id) => {
             *   const fullId = $pathname + " " + id;
             *   self.$reflame.reactRefreshRuntime.register(type, fullId)
             * }
             * "# as Stmt,
             *                 pathname = Ident::new(
             *                     format!("\"{pathname}\"", pathname =
             * self.pathname).into(),                     DUMMY_SP
             *                 ),
             *             )),
             *             ModuleItem::Stmt(quote!(
             *                 r#"
             * self.$RefreshSig$ =
             * self.$reflame.reactRefreshRuntime.createSignatureFunctionForTransform"#
             *                     as Stmt
             *             )), */
        ];
        module_items.splice(0..0, statements_before);

        module_items.push(ModuleItem::Stmt(Stmt::Expr(ExprStmt {
            span: DUMMY_SP,
            expr: Box::new(Expr::Assign(AssignExpr {
                span: DUMMY_SP,
                op: op!("="),
                left: PatOrExpr::Expr(Box::new(Expr::Member(MemberExpr {
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
                right: Box::new(Expr::Ident(Ident {
                    span: DUMMY_SP,
                    optional: false,
                    sym: "$reflamePreviousRefreshReg".into(),
                })),
            })),
        })));

        module_items.push(ModuleItem::Stmt(Stmt::Expr(ExprStmt {
            span: DUMMY_SP,
            expr: Box::new(Expr::Assign(AssignExpr {
                span: DUMMY_SP,
                op: op!("="),
                left: PatOrExpr::Expr(Box::new(Expr::Member(MemberExpr {
                    span: DUMMY_SP,
                    obj: Box::new(Expr::Ident(Ident {
                        span: DUMMY_SP,
                        optional: false,
                        sym: "self".into(),
                    })),
                    prop: MemberProp::Ident(Ident {
                        span: DUMMY_SP,
                        optional: false,
                        sym: "$RefreshSig$".into(),
                    }),
                }))),
                right: Box::new(Expr::Ident(Ident {
                    span: DUMMY_SP,
                    optional: false,
                    sym: "$reflamePreviousRefreshSig".into(),
                })),
            })),
        })));

        module_items.push(ModuleItem::Stmt(Stmt::Expr(ExprStmt {
            span: DUMMY_SP,
            expr: Box::new(Expr::Call(CallExpr {
                span: DUMMY_SP,
                callee: Callee::Expr(Box::new(Expr::Member(MemberExpr {
                    span: DUMMY_SP,
                    obj: Box::new(Expr::Member(MemberExpr {
                        span: DUMMY_SP,
                        obj: Box::new(Expr::Ident(Ident {
                            span: DUMMY_SP,
                            optional: false,
                            sym: "self".into(),
                        })),
                        prop: MemberProp::Ident(Ident {
                            span: DUMMY_SP,
                            optional: false,
                            sym: "$reflame".into(),
                        }),
                    })),
                    prop: MemberProp::Ident(Ident {
                        span: DUMMY_SP,
                        optional: false,
                        sym: "registerAcceptCallback".into(),
                    }),
                }))),
                args: vec![ExprOrSpread {
                    spread: None,
                    expr: Box::new(Expr::Object(ObjectLit {
                        span: DUMMY_SP,
                        props: vec![
                            PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
                                key: PropName::Ident(Ident {
                                    span: DUMMY_SP,
                                    optional: false,
                                    sym: "pathname".into(),
                                }),
                                value: Box::new(Expr::Lit(Lit::Str("/test.js".into()))),
                            }))),
                            PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
                                key: PropName::Ident(Ident {
                                    span: DUMMY_SP,
                                    optional: false,
                                    sym: "callback".into(),
                                }),
                                value: Box::new(Expr::Arrow(ArrowExpr {
                                    span: DUMMY_SP,
                                    params: vec![Pat::Object(ObjectPat {
                                        span: DUMMY_SP,
                                        props: vec![
                                            ObjectPatProp::Assign(AssignPatProp {
                                                span: DUMMY_SP,
                                                key: Ident {
                                                    span: DUMMY_SP,
                                                    sym: "pathname".into(),
                                                    optional: false,
                                                },
                                                value: None,
                                            }),
                                            ObjectPatProp::Assign(AssignPatProp {
                                                span: DUMMY_SP,
                                                key: Ident {
                                                    span: DUMMY_SP,
                                                    sym: "resourceId".into(),
                                                    optional: false,
                                                },
                                                value: None,
                                            }),
                                        ],
                                        optional: false,
                                        type_ann: None,
                                    })],
                                    is_async: false,
                                    is_generator: false,
                                    type_params: None,
                                    return_type: None,
                                    body: BlockStmtOrExpr::BlockStmt(BlockStmt {
                                        span: DUMMY_SP,
                                        stmts: vec![
                                            Stmt::If(IfStmt {
                                                span: DUMMY_SP,
                                                test: Box::new(Expr::Ident(Ident {
                                                    span: DUMMY_SP,
                                                    sym: "resourceId".into(),
                                                    optional: false,
                                                })),
                                                cons: Box::new(Stmt::Block(BlockStmt {
                                                    span: DUMMY_SP,
                                                    stmts: vec![Stmt::Expr(ExprStmt {
                                                        span: DUMMY_SP,
                                                        expr: Box::new(Expr::Call(CallExpr {
                                                            span: DUMMY_SP,
                                                            callee: Callee::Expr(Box::new(
                                                                Expr::Member(MemberExpr {
                                                                    span: DUMMY_SP,
                                                                    obj: Box::new(Expr::Ident(
                                                                        Ident {
                                                                            span: DUMMY_SP,
                                                                            optional: false,
                                                                            sym: "console".into(),
                                                                        },
                                                                    )),
                                                                    prop: MemberProp::Ident(
                                                                        Ident {
                                                                            span: DUMMY_SP,
                                                                            optional: false,
                                                                            sym: "debug".into(),
                                                                        },
                                                                    ),
                                                                }),
                                                            )),
                                                            args: vec![
                                                                ExprOrSpread {
                                                                    spread: None,
                                                                    expr: Box::new(Expr::Lit(
                                                                        Lit::Str(
                                                                            "accepting".into(),
                                                                        ),
                                                                    )),
                                                                },
                                                                ExprOrSpread {
                                                                    spread: None,
                                                                    expr: Box::new(Expr::Ident(
                                                                        Ident {
                                                                            span: DUMMY_SP,
                                                                            optional: false,
                                                                            sym: "pathname".into(),
                                                                        },
                                                                    )),
                                                                },
                                                                ExprOrSpread {
                                                                    spread: None,
                                                                    expr: Box::new(Expr::Lit(
                                                                        Lit::Str("to".into()),
                                                                    )),
                                                                },
                                                                ExprOrSpread {
                                                                    spread: None,
                                                                    expr: Box::new(Expr::Ident(
                                                                        Ident {
                                                                            span: DUMMY_SP,
                                                                            optional: false,
                                                                            sym: "resourceId"
                                                                                .into(),
                                                                        },
                                                                    )),
                                                                },
                                                            ],
                                                            type_args: None,
                                                        })),
                                                    })],
                                                })),
                                                alt: Some(Box::new(Stmt::Block(BlockStmt {
                                                    span: DUMMY_SP,
                                                    stmts: vec![Stmt::Expr(ExprStmt {
                                                        span: DUMMY_SP,
                                                        expr: Box::new(Expr::Call(CallExpr {
                                                            span: DUMMY_SP,
                                                            callee: Callee::Expr(Box::new(
                                                                Expr::Member(MemberExpr {
                                                                    span: DUMMY_SP,
                                                                    obj: Box::new(Expr::Ident(
                                                                        Ident {
                                                                            span: DUMMY_SP,
                                                                            optional: false,
                                                                            sym: "console".into(),
                                                                        },
                                                                    )),
                                                                    prop: MemberProp::Ident(
                                                                        Ident {
                                                                            span: DUMMY_SP,
                                                                            optional: false,
                                                                            sym: "debug".into(),
                                                                        },
                                                                    ),
                                                                }),
                                                            )),
                                                            args: vec![
                                                                ExprOrSpread {
                                                                    spread: None,
                                                                    expr: Box::new(Expr::Lit(
                                                                        Lit::Str(
                                                                            "accepting".into(),
                                                                        ),
                                                                    )),
                                                                },
                                                                ExprOrSpread {
                                                                    spread: None,
                                                                    expr: Box::new(Expr::Ident(
                                                                        Ident {
                                                                            span: DUMMY_SP,
                                                                            optional: false,
                                                                            sym: "pathname".into(),
                                                                        },
                                                                    )),
                                                                },
                                                            ],
                                                            type_args: None,
                                                        })),
                                                    })],
                                                }))),
                                            }),
                                            Stmt::Expr(ExprStmt {
                                                span: DUMMY_SP,
                                                expr: Box::new(Expr::Call(CallExpr {
                                                    span: DUMMY_SP,
                                                    callee: Callee::Expr(Box::new(Expr::Member(
                                                        MemberExpr {
                                                            span: DUMMY_SP,
                                                            obj: Box::new(Expr::Member(
                                                                MemberExpr {
                                                                    span: DUMMY_SP,
                                                                    obj: Box::new(Expr::Ident(
                                                                        Ident {
                                                                            span: DUMMY_SP,
                                                                            optional: false,
                                                                            sym: "self".into(),
                                                                        },
                                                                    )),
                                                                    prop: MemberProp::Ident(
                                                                        Ident {
                                                                            span: DUMMY_SP,
                                                                            optional: false,
                                                                            sym: "$reflame".into(),
                                                                        },
                                                                    ),
                                                                },
                                                            )),
                                                            prop: MemberProp::Ident(Ident {
                                                                span: DUMMY_SP,
                                                                optional: false,
                                                                sym: "performReactRefresh".into(),
                                                            }),
                                                        },
                                                    ))),
                                                    args: vec![],
                                                    type_args: None,
                                                })),
                                            }),
                                        ],
                                    }),
                                })),
                            }))),
                        ],
                    })),
                }],
                type_args: None,
            })),
        })))

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
