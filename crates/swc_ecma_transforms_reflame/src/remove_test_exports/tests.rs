use swc_ecma_transforms_testing::test;

use super::*;

test!(
    ::swc_ecma_parser::Syntax::Es(::swc_ecma_parser::EsSyntax {
        jsx: true,
        ..Default::default()
    }),
    |_| remove_test_exports(),
    basic_sample,
    // Input codes
    r#"
import * as blah from './blah.js'

const blah2_test = 1
const blah3 = 2
const blah4_test = 3
export { blah2_test, blah3 }
export { blah4_test }
export const blah_test = 12345,blah5 = 123
export const blah6_test = 12345,blah7_test = 123
blah6_test.run = () => console.log('test')

export const blah = 1234
"#
);
