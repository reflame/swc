//// [typeArgumentInferenceWithClassExpression1.ts]
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
var _class;
function foo() {
    var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function x() {
        "use strict";
        _class_call_check(this, x);
    };
    return undefined;
}
foo((_class = function _class() {
    "use strict";
    _class_call_check(this, _class);
}, function() {
    _class.prop = "hello";
}(), _class)).length;
