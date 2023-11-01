use swc_ecma_transforms_testing::test;

use super::*;

test!(
    ::swc_ecma_parser::Syntax::Es(::swc_ecma_parser::EsConfig {
        jsx: true,
        ..Default::default()
    }),
    |_| refresh_setup(
        true,
        Some(RefreshSetupOptions {
            pathname: Some("/hi.js".into()),
        }),
    ),
    basic_sample,
    // Input codes
    r#"
import * as blah from './blah.js'

export const blah_test = 12345

export const blah = 1234
"#
);

test!(
    ::swc_ecma_parser::Syntax::Es(::swc_ecma_parser::EsConfig {
        jsx: true,
        ..Default::default()
    }),
    |_| refresh_setup(false, None,),
    disabled,
    // Input codes
    r#"
import * as blah from './blah.js'

export const blah_test = 12345

export const blah = 1234
"#
);
