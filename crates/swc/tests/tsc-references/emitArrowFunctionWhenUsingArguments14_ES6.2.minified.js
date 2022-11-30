//// [emitArrowFunctionWhenUsingArguments14_ES6.ts]
//! 
//!   x 'eval' and 'arguments' cannot be used as a binding identifier in strict mode
//!    ,-[1:1]
//!  1 | 
//!  2 | function f() {
//!  3 |     if (Math.random()) {
//!  4 |         let arguments = 100;
//!    :             ^^^^^^^^^
//!  5 |         return () => arguments;
//!  6 |     }
//!  7 | }
//!    `----
