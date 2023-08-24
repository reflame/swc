//// [propertyAccessOnTypeParameterWithConstraints2.ts]
// generic types should behave as if they have properties of their constraint type
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _inherits } from "@swc/helpers/_/_inherits";
import { _ as _create_super } from "@swc/helpers/_/_create_super";
var i, a, B = function(A) {
    _inherits(B, A);
    var _super = _create_super(B);
    function B() {
        return _class_call_check(this, B), _super.apply(this, arguments);
    }
    return B.prototype.bar = function() {
        return "";
    }, B;
}(function() {
    function A() {
        _class_call_check(this, A);
    }
    return A.prototype.foo = function() {
        return "";
    }, A;
}()), C = function() {
    function C() {
        _class_call_check(this, C);
    }
    var _proto = C.prototype;
    return _proto.f = function() {
        var x; // should be string
        return x.foo() + x.foo();
    }, _proto.g = function(x) {
        return x.foo() + x.foo();
    }, C;
}();
new C().f(), new C().g(new B()), i.foo.foo(), i.foo.foo(), a().foo(), a().foo();
// parameter supplied for type argument inference to succeed
var aB = new B();
a(aB, aB).foo(), a(aB, aB).foo(), ({
    foo: function(x, y) {
        return x.foo() + x.foo();
    }
}).foo(aB, aB);
 // no inferences for T so constraint isn't satisfied, error
