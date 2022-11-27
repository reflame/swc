use swc_ecma_transforms_testing::test;

use super::*;

fn tr() -> impl Fold {
    refresh_setup("test.js".to_string())
}

test!(
    ::swc_ecma_parser::Syntax::Es(::swc_ecma_parser::EsConfig {
        jsx: true,
        ..Default::default()
    }),
    |_| tr(),
    basic_sample,
    // Input codes
    r#"
import * as blah from './blah.js'

export const blah_test = 12345

export const blah = 1234
"#,
    // Output codes after transformed with plugin
    r#"
const $reflamePreviousRefreshReg = self.$RefreshReg$
const $reflamePreviousRefreshSig = self.$RefreshSig$
self.$RefreshReg$ = (type, id) => {
    const fullId = "/test.js" + " " + id;
    self.$reflame.reactRefreshRuntime.register(type, fullId)
}
self.$RefreshSig$ = self.$reflame.reactRefreshRuntime.createSignatureFunctionForTransform

import * as blah from './blah.js'

export const blah_test = 12345

export const blah = 1234

self.$RefreshReg$ = $reflamePreviousRefreshReg
self.$RefreshSig$ = $reflamePreviousRefreshSig

self.$reflame.registerAcceptCallback({ 
  pathname: "/test.js",
  callback: ({ pathname, resourceId }) => {
    if (resourceId) {
      console.debug('accepting', pathname, 'to', resourceId)
    } else {
      console.debug('accepting', pathname)
    }

    self.$reflame.performReactRefresh()
  }, 
})
"#
);
