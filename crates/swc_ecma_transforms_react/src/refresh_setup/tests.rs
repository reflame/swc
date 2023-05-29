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
"#,
    // Output codes after transformed with plugin
    r#"
import.meta.url = new URL("/hi.js", location.origin)
const $reflamePathname = new URL(import.meta.url).pathname
const $reflamePreviousRefreshReg = self.$RefreshReg$
const $reflamePreviousRefreshSig = self.$RefreshSig$
self.$RefreshReg$ = (type, id) => {
    const fullId = $reflamePathname + ` ${id}`
    self.$reflame.reactRefreshRuntime.register(type, fullId)
}
self.$RefreshSig$ = self.$reflame.reactRefreshRuntime.createSignatureFunctionForTransform

import * as blah from './blah.js'

export const blah_test = 12345

export const blah = 1234

self.$RefreshReg$ = $reflamePreviousRefreshReg
self.$RefreshSig$ = $reflamePreviousRefreshSig

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
})
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
"#,
    // Output codes after transformed with plugin
    r#"
import * as blah from './blah.js'

export const blah_test = 12345

export const blah = 1234
"#
);
