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