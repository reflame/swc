use swc::{
    config::{Config, IsModule, JscConfig, Options},
    Compiler,
};
use swc_common::FileName;
use swc_ecma_ast::EsVersion;
use swc_ecma_parser::{Syntax, TsConfig};
use testing::Tester;

fn compile(src: &str, options: Options) -> String {
    Tester::new()
        .print_errors(|cm, handler| {
            let c = Compiler::new(cm.clone());

            let fm =
                cm.new_source_file(FileName::Real(options.filename.clone().into()), src.into());
            let s = c.process_js_file(fm, &handler, &options);

            match s {
                Ok(v) => {
                    if handler.has_errors() {
                        Err(())
                    } else {
                        Ok(v.code)
                    }
                }
                Err(..) => Err(()),
            }
        })
        .unwrap()
}

#[test]
fn rewrite_relative_imports() {
    let source = "import './blah.ts'";
    let expected = "import \"~r/blah.ts\";\n";

    let compiled = compile(
        source,
        Options {
            swcrc: false,
            filename: "~r/index.ts".to_owned(),
            config: Config {
                is_module: Some(IsModule::Unknown),
                module: Some(swc::config::ModuleConfig::Es6),

                jsc: JscConfig {
                    rewrite_relative_imports: true.into(),
                    ..Default::default()
                },
                ..Default::default()
            },
            ..Default::default()
        },
    );

    assert_eq!(compiled, expected);
}
