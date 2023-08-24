//// [arrayLiterals.ts]
// Empty array literal with no contextual type has type Undefined[]
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _inherits } from "@swc/helpers/_/_inherits";
import { _ as _create_super } from "@swc/helpers/_/_create_super";
var C = function C() {
    _class_call_check(this, C);
};
new C(), new C();
// Contextual type C with numeric index signature of type Base makes array literal of Derived have type Base[]
var Base = function Base() {
    _class_call_check(this, Base);
}, Derived1 = function(Base) {
    _inherits(Derived1, Base);
    var _super = _create_super(Derived1);
    function Derived1() {
        return _class_call_check(this, Derived1), _super.apply(this, arguments);
    }
    return Derived1;
}(Base), Derived2 = function(Base) {
    _inherits(Derived2, Base);
    var _super = _create_super(Derived2);
    function Derived2() {
        return _class_call_check(this, Derived2), _super.apply(this, arguments);
    }
    return Derived2;
}(Base);
new Derived1(), new Derived2(), new Derived1(), new Derived1();
