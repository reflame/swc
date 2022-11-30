//// [foo.ts]
//! 
//!   x Export assignment cannot be used when targeting ECMAScript modules. Consider using `export default` or another module format instead.
//!    ,-[3:1]
//!  3 |     y: number;
//!  4 |     data: T;
//!  5 | }
//!  6 | export = Point;
//!    : ^^^^^^^^^^^^^^^
//!  7 | 
//!    `----
//// [foo2.ts]
import _class_call_check from "@swc/helpers/src/_class_call_check.mjs";
var Bar = function Bar(input) {
    "use strict";
    _class_call_check(this, Bar);
};
export { Bar };
//// [usage.ts]
import _class_call_check from "@swc/helpers/src/_class_call_check.mjs";
export var x = {
    x: 0,
    y: 0,
    data: {
        x: 12
    }
};
export var y = {
    a: "",
    b: 0,
    data: {
        x: 12
    }
};
export var Bar2 = function Bar2(input) {
    "use strict";
    _class_call_check(this, Bar2);
};
export var shim = {
    Bar: Bar2
};
