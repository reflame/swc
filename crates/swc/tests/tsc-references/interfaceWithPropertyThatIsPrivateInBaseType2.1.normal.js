//// [interfaceWithPropertyThatIsPrivateInBaseType2.ts]
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
var Base = /*#__PURE__*/ function() {
    "use strict";
    function Base() {
        _class_call_check(this, Base);
    }
    var _proto = Base.prototype;
    _proto.x = function x() {};
    return Base;
}();
var Base2 = /*#__PURE__*/ function() {
    "use strict";
    function Base2() {
        _class_call_check(this, Base2);
    }
    var _proto = Base2.prototype;
    _proto.x = function x() {};
    return Base2;
}();
