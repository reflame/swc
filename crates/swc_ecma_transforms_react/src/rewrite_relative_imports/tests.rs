use swc_ecma_transforms_testing::test;

use super::*;

test!(
    ::swc_ecma_parser::Syntax::Es(::swc_ecma_parser::EsConfig {
        jsx: true,
        ..Default::default()
    }),
    |_| rewrite_relative_imports(Some(RewriteRelativeImportsOptions {
        pathname: Some("/deep/path/hi.js".into()),
    }),),
    basic_sample,
    // Input codes
    r#"
import * as blah1 from './blah.js'
import * as blah2 from '../blah.js'
import * as blah3 from '/some/other/path/blah.js'
import * as react from 'react/test'

import('./blah.js')
import('../blah.js')
import('/some/other/path/blah.js')
import('react/test')
"#
);

test!(
    ::swc_ecma_parser::Syntax::Es(::swc_ecma_parser::EsConfig {
        jsx: true,
        ..Default::default()
    }),
    |_| rewrite_relative_imports(None,),
    disabled,
    // Input codes
    r#"
import * as blah1 from './blah.js'
import * as blah2 from '../blah.js'
import * as blah3 from '/some/other/path/blah.js'
import * as react from 'react/test'

import('./blah.js')
import('../blah.js')
import('/some/other/path/blah.js')
import('react/test')
"#
);
