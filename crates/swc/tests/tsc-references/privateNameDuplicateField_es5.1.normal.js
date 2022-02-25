function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _classPrivateFieldInit(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function _classPrivateMethodInit(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
}
// @strict: true
// @target: es6
function Field() {
    var foo = function foo() {};
    var get_foo = function get_foo() {
        return "";
    };
    var set_foo = function set_foo(value) {};
    var foo1 = function foo1() {};
    var get_foo1 = function get_foo1() {
        return "";
    };
    var set_foo1 = function set_foo1(value) {};
    var _foo = new WeakMap(), _foo = new WeakMap();
    var A_Field_Field = function A_Field_Field() {
        "use strict";
        _classCallCheck(this, A_Field_Field);
        _classPrivateFieldInit(this, _foo, {
            writable: true,
            value: "foo"
        });
        _classPrivateFieldInit(this, _foo, {
            writable: true,
            value: "foo"
        });
    };
    var _foo1 = new WeakMap(), _foo1 = new WeakSet();
    var A_Field_Method = function A_Field_Method() {
        "use strict";
        _classCallCheck(this, A_Field_Method);
        _classPrivateFieldInit(this, _foo1, {
            writable: true,
            value: "foo"
        });
        _classPrivateMethodInit(this, _foo1);
    };
    var _foo2 = new WeakMap(), _foo2 = new WeakMap();
    var A_Field_Getter = function A_Field_Getter() {
        "use strict";
        _classCallCheck(this, A_Field_Getter);
        _classPrivateFieldInit(this, _foo2, {
            writable: true,
            value: "foo"
        });
        _classPrivateFieldInit(this, _foo2, {
            get: get_foo,
            set: void 0
        });
    };
    var _foo3 = new WeakMap(), _foo3 = new WeakMap();
    var A_Field_Setter = function A_Field_Setter() {
        "use strict";
        _classCallCheck(this, A_Field_Setter);
        _classPrivateFieldInit(this, _foo3, {
            writable: true,
            value: "foo"
        });
        _classPrivateFieldInit(this, _foo3, {
            get: void 0,
            set: set_foo
        });
    };
    var _foo4 = new WeakMap();
    var A_Field_StaticField = function A_Field_StaticField() {
        "use strict";
        _classCallCheck(this, A_Field_StaticField);
        _classPrivateFieldInit(this, _foo4, {
            writable: true,
            value: "foo"
        });
    };
    var _foo4 = {
        writable: true,
        value: "foo"
    };
    var _foo5 = new WeakMap();
    var A_Field_StaticMethod = function A_Field_StaticMethod() {
        "use strict";
        _classCallCheck(this, A_Field_StaticMethod);
        _classPrivateFieldInit(this, _foo5, {
            writable: true,
            value: "foo"
        });
    };
    var _foo6 = new WeakMap();
    var A_Field_StaticGetter = function A_Field_StaticGetter() {
        "use strict";
        _classCallCheck(this, A_Field_StaticGetter);
        _classPrivateFieldInit(this, _foo6, {
            writable: true,
            value: "foo"
        });
    };
    var _foo6 = {
        get: get_foo1,
        set: void 0
    };
    var _foo7 = new WeakMap();
    var A_Field_StaticSetter = function A_Field_StaticSetter() {
        "use strict";
        _classCallCheck(this, A_Field_StaticSetter);
        _classPrivateFieldInit(this, _foo7, {
            writable: true,
            value: "foo"
        });
    };
    var _foo7 = {
        get: void 0,
        set: set_foo1
    };
}
function Method() {
    var foo = function foo() {};
    var foo2 = function foo2() {};
    var foo2 = function foo2() {};
    var foo3 = function foo3() {};
    var get_foo = function get_foo() {
        return "";
    };
    var foo4 = function foo4() {};
    var set_foo = function set_foo(value) {};
    var foo5 = function foo5() {};
    var foo6 = function foo6() {};
    var foo6 = function foo6() {};
    var foo7 = function foo7() {};
    var get_foo2 = function get_foo2() {
        return "";
    };
    var foo8 = function foo8() {};
    var set_foo2 = function set_foo2(value) {};
    var _foo = new WeakSet(), _foo = new WeakMap();
    var A_Method_Field = function A_Method_Field() {
        "use strict";
        _classCallCheck(this, A_Method_Field);
        _classPrivateMethodInit(this, _foo);
        _classPrivateFieldInit(this, _foo, {
            writable: true,
            value: "foo"
        });
    };
    var _foo8 = new WeakSet(), _foo8 = new WeakSet();
    var A_Method_Method = function A_Method_Method() {
        "use strict";
        _classCallCheck(this, A_Method_Method);
        _classPrivateMethodInit(this, _foo8);
        _classPrivateMethodInit(this, _foo8);
    };
    var _foo9 = new WeakSet(), _foo9 = new WeakMap();
    var A_Method_Getter = function A_Method_Getter() {
        "use strict";
        _classCallCheck(this, A_Method_Getter);
        _classPrivateMethodInit(this, _foo9);
        _classPrivateFieldInit(this, _foo9, {
            get: get_foo,
            set: void 0
        });
    };
    var _foo10 = new WeakSet(), _foo10 = new WeakMap();
    var A_Method_Setter = function A_Method_Setter() {
        "use strict";
        _classCallCheck(this, A_Method_Setter);
        _classPrivateMethodInit(this, _foo10);
        _classPrivateFieldInit(this, _foo10, {
            get: void 0,
            set: set_foo
        });
    };
    var _foo11 = new WeakSet();
    var A_Method_StaticField = function A_Method_StaticField() {
        "use strict";
        _classCallCheck(this, A_Method_StaticField);
        _classPrivateMethodInit(this, _foo11);
    };
    var _foo11 = {
        writable: true,
        value: "foo"
    };
    var _foo12 = new WeakSet();
    var A_Method_StaticMethod = function A_Method_StaticMethod() {
        "use strict";
        _classCallCheck(this, A_Method_StaticMethod);
        _classPrivateMethodInit(this, _foo12);
    };
    var _foo13 = new WeakSet();
    var A_Method_StaticGetter = function A_Method_StaticGetter() {
        "use strict";
        _classCallCheck(this, A_Method_StaticGetter);
        _classPrivateMethodInit(this, _foo13);
    };
    var _foo13 = {
        get: get_foo2,
        set: void 0
    };
    var _foo14 = new WeakSet();
    var A_Method_StaticSetter = function A_Method_StaticSetter() {
        "use strict";
        _classCallCheck(this, A_Method_StaticSetter);
        _classPrivateMethodInit(this, _foo14);
    };
    var _foo14 = {
        get: void 0,
        set: set_foo2
    };
}
function Getter() {
    var get_foo = function get_foo() {
        return "";
    };
    var get_foo3 = function get_foo3() {
        return "";
    };
    var foo = function foo() {};
    var get_foo4 = function get_foo4() {
        return "";
    };
    var get_foo4 = function get_foo4() {
        return "";
    };
    var get_foo5 = function get_foo5() {
        return "";
    };
    var set_foo = function set_foo(value) {};
    var get_foo6 = function get_foo6() {
        return "";
    };
    var foo9 = function foo9() {};
    var get_foo7 = function get_foo7() {
        return "";
    };
    var foo10 = function foo10() {};
    var get_foo8 = function get_foo8() {
        return "";
    };
    var get_foo8 = function get_foo8() {
        return "";
    };
    var get_foo9 = function get_foo9() {
        return "";
    };
    var set_foo3 = function set_foo3(value) {};
    var _foo = new WeakMap(), _foo = new WeakMap();
    var A_Getter_Field = function A_Getter_Field() {
        "use strict";
        _classCallCheck(this, A_Getter_Field);
        _classPrivateFieldInit(this, _foo, {
            get: get_foo,
            set: void 0
        });
        _classPrivateFieldInit(this, _foo, {
            writable: true,
            value: "foo"
        });
    };
    var _foo15 = new WeakMap(), _foo15 = new WeakSet();
    var A_Getter_Method = function A_Getter_Method() {
        "use strict";
        _classCallCheck(this, A_Getter_Method);
        _classPrivateFieldInit(this, _foo15, {
            get: get_foo3,
            set: void 0
        });
        _classPrivateMethodInit(this, _foo15);
    };
    var _foo16 = new WeakMap();
    var A_Getter_Getter = function A_Getter_Getter() {
        "use strict";
        _classCallCheck(this, A_Getter_Getter);
        _classPrivateFieldInit(this, _foo16, {
            get: get_foo4,
            set: void 0
        });
    };
    var _foo17 = new WeakMap();
    var A_Getter_Setter = function A_Getter_Setter() {
        "use strict";
        _classCallCheck(this, A_Getter_Setter);
        _classPrivateFieldInit(this, _foo17, {
            get: get_foo5,
            set: set_foo
        });
    };
    var _foo18 = new WeakMap();
    var A_Getter_StaticField = function A_Getter_StaticField() {
        "use strict";
        _classCallCheck(this, A_Getter_StaticField);
        _classPrivateFieldInit(this, _foo18, {
            get: get_foo6,
            set: void 0
        });
    };
    var _foo19 = new WeakMap();
    var A_Getter_StaticMethod = function A_Getter_StaticMethod() {
        "use strict";
        _classCallCheck(this, A_Getter_StaticMethod);
        _classPrivateFieldInit(this, _foo19, {
            get: get_foo7,
            set: void 0
        });
    };
    var _foo20 = new WeakMap();
    var A_Getter_StaticGetter = function A_Getter_StaticGetter() {
        "use strict";
        _classCallCheck(this, A_Getter_StaticGetter);
        _classPrivateFieldInit(this, _foo20, {
            get: get_foo8,
            set: void 0
        });
    };
    var _foo20 = {
        get: get_foo8,
        set: void 0
    };
    var _foo21 = new WeakMap();
    var A_Getter_StaticSetter = function A_Getter_StaticSetter() {
        "use strict";
        _classCallCheck(this, A_Getter_StaticSetter);
        _classPrivateFieldInit(this, _foo21, {
            get: get_foo9,
            set: void 0
        });
    };
    var _foo21 = {
        get: void 0,
        set: set_foo3
    };
}
function Setter() {
    var set_foo = function set_foo(value) {};
    var set_foo4 = function set_foo4(value) {};
    var foo = function foo() {};
    var set_foo5 = function set_foo5(value) {};
    var get_foo = function get_foo() {
        return "";
    };
    var set_foo6 = function set_foo6(value) {};
    var set_foo6 = function set_foo6(value) {};
    var set_foo7 = function set_foo7(value) {};
    var set_foo8 = function set_foo8(value) {};
    var foo11 = function foo11() {};
    var set_foo9 = function set_foo9(value) {};
    var get_foo10 = function get_foo10() {
        return "";
    };
    var set_foo10 = function set_foo10(value) {};
    var set_foo10 = function set_foo10(value) {};
    var _foo = new WeakMap(), _foo = new WeakMap();
    var A_Setter_Field = function A_Setter_Field() {
        "use strict";
        _classCallCheck(this, A_Setter_Field);
        _classPrivateFieldInit(this, _foo, {
            get: void 0,
            set: set_foo
        });
        _classPrivateFieldInit(this, _foo, {
            writable: true,
            value: "foo"
        });
    };
    var _foo22 = new WeakMap(), _foo22 = new WeakSet();
    var A_Setter_Method = function A_Setter_Method() {
        "use strict";
        _classCallCheck(this, A_Setter_Method);
        _classPrivateFieldInit(this, _foo22, {
            get: void 0,
            set: set_foo4
        });
        _classPrivateMethodInit(this, _foo22);
    };
    var _foo23 = new WeakMap();
    var A_Setter_Getter = function A_Setter_Getter() {
        "use strict";
        _classCallCheck(this, A_Setter_Getter);
        _classPrivateFieldInit(this, _foo23, {
            get: get_foo,
            set: set_foo5
        });
    };
    var _foo24 = new WeakMap();
    var A_Setter_Setter = function A_Setter_Setter() {
        "use strict";
        _classCallCheck(this, A_Setter_Setter);
        _classPrivateFieldInit(this, _foo24, {
            get: void 0,
            set: set_foo6
        });
    };
    var _foo25 = new WeakMap();
    var A_Setter_StaticField = function A_Setter_StaticField() {
        "use strict";
        _classCallCheck(this, A_Setter_StaticField);
        _classPrivateFieldInit(this, _foo25, {
            get: void 0,
            set: set_foo7
        });
    };
    var _foo25 = {
        writable: true,
        value: "foo"
    };
    var _foo26 = new WeakMap();
    var A_Setter_StaticMethod = function A_Setter_StaticMethod() {
        "use strict";
        _classCallCheck(this, A_Setter_StaticMethod);
        _classPrivateFieldInit(this, _foo26, {
            get: void 0,
            set: set_foo8
        });
    };
    var _foo27 = new WeakMap();
    var A_Setter_StaticGetter = function A_Setter_StaticGetter() {
        "use strict";
        _classCallCheck(this, A_Setter_StaticGetter);
        _classPrivateFieldInit(this, _foo27, {
            get: void 0,
            set: set_foo9
        });
    };
    var _foo27 = {
        get: get_foo10,
        set: void 0
    };
    var _foo28 = new WeakMap();
    var A_Setter_StaticSetter = function A_Setter_StaticSetter() {
        "use strict";
        _classCallCheck(this, A_Setter_StaticSetter);
        _classPrivateFieldInit(this, _foo28, {
            get: void 0,
            set: set_foo10
        });
    };
    var _foo28 = {
        get: void 0,
        set: set_foo10
    };
}
function StaticField() {
    var foo = function foo() {};
    var get_foo = function get_foo() {
        return "";
    };
    var set_foo = function set_foo(value) {};
    var foo12 = function foo12() {};
    var get_foo11 = function get_foo11() {
        return "";
    };
    var set_foo11 = function set_foo11(value) {};
    var _foo = new WeakMap();
    var A_StaticField_Field = function A_StaticField_Field() {
        "use strict";
        _classCallCheck(this, A_StaticField_Field);
        _classPrivateFieldInit(this, _foo, {
            writable: true,
            value: "foo"
        });
    };
    var _foo = {
        writable: true,
        value: "foo"
    };
    var _foo29 = new WeakSet();
    var A_StaticField_Method = function A_StaticField_Method() {
        "use strict";
        _classCallCheck(this, A_StaticField_Method);
        _classPrivateMethodInit(this, _foo29);
    };
    var _foo29 = {
        writable: true,
        value: "foo"
    };
    var _foo30 = new WeakMap();
    var A_StaticField_Getter = function A_StaticField_Getter() {
        "use strict";
        _classCallCheck(this, A_StaticField_Getter);
        _classPrivateFieldInit(this, _foo30, {
            get: get_foo,
            set: void 0
        });
    };
    var _foo30 = {
        writable: true,
        value: "foo"
    };
    var _foo31 = new WeakMap();
    var A_StaticField_Setter = function A_StaticField_Setter() {
        "use strict";
        _classCallCheck(this, A_StaticField_Setter);
        _classPrivateFieldInit(this, _foo31, {
            get: void 0,
            set: set_foo
        });
    };
    var _foo31 = {
        writable: true,
        value: "foo"
    };
    var A_StaticField_StaticField = function A_StaticField_StaticField() {
        "use strict";
        _classCallCheck(this, A_StaticField_StaticField);
    };
    var _foo32 = {
        writable: true,
        value: "foo"
    };
    var _foo32 = {
        writable: true,
        value: "foo"
    };
    var A_StaticField_StaticMethod = function A_StaticField_StaticMethod() {
        "use strict";
        _classCallCheck(this, A_StaticField_StaticMethod);
    };
    var _foo33 = {
        writable: true,
        value: "foo"
    };
    var A_StaticField_StaticGetter = function A_StaticField_StaticGetter() {
        "use strict";
        _classCallCheck(this, A_StaticField_StaticGetter);
    };
    var _foo34 = {
        writable: true,
        value: "foo"
    };
    var _foo34 = {
        get: get_foo11,
        set: void 0
    };
    var A_StaticField_StaticSetter = function A_StaticField_StaticSetter() {
        "use strict";
        _classCallCheck(this, A_StaticField_StaticSetter);
    };
    var _foo35 = {
        writable: true,
        value: "foo"
    };
    var _foo35 = {
        get: void 0,
        set: set_foo11
    };
}
function StaticMethod() {
    var foo = function foo() {};
    var foo13 = function foo13() {};
    var foo13 = function foo13() {};
    var foo14 = function foo14() {};
    var get_foo = function get_foo() {
        return "";
    };
    var foo15 = function foo15() {};
    var set_foo = function set_foo(value) {};
    var foo16 = function foo16() {};
    var foo17 = function foo17() {};
    var foo17 = function foo17() {};
    var foo18 = function foo18() {};
    var get_foo12 = function get_foo12() {
        return "";
    };
    var foo19 = function foo19() {};
    var set_foo12 = function set_foo12(value) {};
    var _foo = new WeakMap();
    var A_StaticMethod_Field = function A_StaticMethod_Field() {
        "use strict";
        _classCallCheck(this, A_StaticMethod_Field);
        _classPrivateFieldInit(this, _foo, {
            writable: true,
            value: "foo"
        });
    };
    var _foo36 = new WeakSet();
    var A_StaticMethod_Method = function A_StaticMethod_Method() {
        "use strict";
        _classCallCheck(this, A_StaticMethod_Method);
        _classPrivateMethodInit(this, _foo36);
    };
    var _foo37 = new WeakMap();
    var A_StaticMethod_Getter = function A_StaticMethod_Getter() {
        "use strict";
        _classCallCheck(this, A_StaticMethod_Getter);
        _classPrivateFieldInit(this, _foo37, {
            get: get_foo,
            set: void 0
        });
    };
    var _foo38 = new WeakMap();
    var A_StaticMethod_Setter = function A_StaticMethod_Setter() {
        "use strict";
        _classCallCheck(this, A_StaticMethod_Setter);
        _classPrivateFieldInit(this, _foo38, {
            get: void 0,
            set: set_foo
        });
    };
    var A_StaticMethod_StaticField = function A_StaticMethod_StaticField() {
        "use strict";
        _classCallCheck(this, A_StaticMethod_StaticField);
    };
    var _foo39 = {
        writable: true,
        value: "foo"
    };
    var A_StaticMethod_StaticMethod = function A_StaticMethod_StaticMethod() {
        "use strict";
        _classCallCheck(this, A_StaticMethod_StaticMethod);
    };
    var A_StaticMethod_StaticGetter = function A_StaticMethod_StaticGetter() {
        "use strict";
        _classCallCheck(this, A_StaticMethod_StaticGetter);
    };
    var _foo40 = {
        get: get_foo12,
        set: void 0
    };
    var A_StaticMethod_StaticSetter = function A_StaticMethod_StaticSetter() {
        "use strict";
        _classCallCheck(this, A_StaticMethod_StaticSetter);
    };
    var _foo41 = {
        get: void 0,
        set: set_foo12
    };
}
function StaticGetter() {
    var get_foo = function get_foo() {
        return "";
    };
    var get_foo13 = function get_foo13() {
        return "";
    };
    var foo = function foo() {};
    var get_foo14 = function get_foo14() {
        return "";
    };
    var get_foo14 = function get_foo14() {
        return "";
    };
    var get_foo15 = function get_foo15() {
        return "";
    };
    var set_foo = function set_foo(value) {};
    var get_foo16 = function get_foo16() {
        return "";
    };
    var foo20 = function foo20() {};
    var get_foo17 = function get_foo17() {
        return "";
    };
    var foo21 = function foo21() {};
    var get_foo18 = function get_foo18() {
        return "";
    };
    var get_foo18 = function get_foo18() {
        return "";
    };
    var get_foo19 = function get_foo19() {
        return "";
    };
    var set_foo13 = function set_foo13(value) {};
    var _foo = new WeakMap();
    var A_StaticGetter_Field = function A_StaticGetter_Field() {
        "use strict";
        _classCallCheck(this, A_StaticGetter_Field);
        _classPrivateFieldInit(this, _foo, {
            writable: true,
            value: "foo"
        });
    };
    var _foo = {
        get: get_foo,
        set: void 0
    };
    var _foo42 = new WeakSet();
    var A_StaticGetter_Method = function A_StaticGetter_Method() {
        "use strict";
        _classCallCheck(this, A_StaticGetter_Method);
        _classPrivateMethodInit(this, _foo42);
    };
    var _foo42 = {
        get: get_foo13,
        set: void 0
    };
    var _foo43 = new WeakMap();
    var A_StaticGetter_Getter = function A_StaticGetter_Getter() {
        "use strict";
        _classCallCheck(this, A_StaticGetter_Getter);
        _classPrivateFieldInit(this, _foo43, {
            get: get_foo14,
            set: void 0
        });
    };
    var _foo43 = {
        get: get_foo14,
        set: void 0
    };
    var _foo44 = new WeakMap();
    var A_StaticGetter_Setter = function A_StaticGetter_Setter() {
        "use strict";
        _classCallCheck(this, A_StaticGetter_Setter);
        _classPrivateFieldInit(this, _foo44, {
            get: void 0,
            set: set_foo
        });
    };
    var _foo44 = {
        get: get_foo15,
        set: void 0
    };
    var A_StaticGetter_StaticField = function A_StaticGetter_StaticField() {
        "use strict";
        _classCallCheck(this, A_StaticGetter_StaticField);
    };
    var _foo45 = {
        get: get_foo16,
        set: void 0
    };
    var A_StaticGetter_StaticMethod = function A_StaticGetter_StaticMethod() {
        "use strict";
        _classCallCheck(this, A_StaticGetter_StaticMethod);
    };
    var _foo46 = {
        get: get_foo17,
        set: void 0
    };
    var A_StaticGetter_StaticGetter = function A_StaticGetter_StaticGetter() {
        "use strict";
        _classCallCheck(this, A_StaticGetter_StaticGetter);
    };
    var _foo47 = {
        get: get_foo18,
        set: void 0
    };
    var A_StaticGetter_StaticSetter = function A_StaticGetter_StaticSetter() {
        "use strict";
        _classCallCheck(this, A_StaticGetter_StaticSetter);
    };
    var _foo48 = {
        get: get_foo19,
        set: set_foo13
    };
}
function StaticSetter() {
    var set_foo = function set_foo(value) {};
    var set_foo14 = function set_foo14(value) {};
    var foo = function foo() {};
    var set_foo15 = function set_foo15(value) {};
    var get_foo = function get_foo() {
        return "";
    };
    var set_foo16 = function set_foo16(value) {};
    var set_foo16 = function set_foo16(value) {};
    var set_foo17 = function set_foo17(value) {};
    var set_foo18 = function set_foo18(value) {};
    var foo22 = function foo22() {};
    var set_foo19 = function set_foo19(value) {};
    var get_foo20 = function get_foo20() {
        return "";
    };
    var set_foo20 = function set_foo20(value) {};
    var set_foo20 = function set_foo20(value) {};
    var _foo = new WeakMap();
    var A_StaticSetter_Field = function A_StaticSetter_Field() {
        "use strict";
        _classCallCheck(this, A_StaticSetter_Field);
        _classPrivateFieldInit(this, _foo, {
            writable: true,
            value: "foo"
        });
    };
    var _foo = {
        get: void 0,
        set: set_foo
    };
    var _foo49 = new WeakSet();
    var A_StaticSetter_Method = function A_StaticSetter_Method() {
        "use strict";
        _classCallCheck(this, A_StaticSetter_Method);
        _classPrivateMethodInit(this, _foo49);
    };
    var _foo49 = {
        get: void 0,
        set: set_foo14
    };
    var _foo50 = new WeakMap();
    var A_StaticSetter_Getter = function A_StaticSetter_Getter() {
        "use strict";
        _classCallCheck(this, A_StaticSetter_Getter);
        _classPrivateFieldInit(this, _foo50, {
            get: get_foo,
            set: void 0
        });
    };
    var _foo50 = {
        get: void 0,
        set: set_foo15
    };
    var _foo51 = new WeakMap();
    var A_StaticSetter_Setter = function A_StaticSetter_Setter() {
        "use strict";
        _classCallCheck(this, A_StaticSetter_Setter);
        _classPrivateFieldInit(this, _foo51, {
            get: void 0,
            set: set_foo16
        });
    };
    var _foo51 = {
        get: void 0,
        set: set_foo16
    };
    var A_StaticSetter_StaticField = function A_StaticSetter_StaticField() {
        "use strict";
        _classCallCheck(this, A_StaticSetter_StaticField);
    };
    var _foo52 = {
        get: void 0,
        set: set_foo17
    };
    var _foo52 = {
        writable: true,
        value: "foo"
    };
    var A_StaticSetter_StaticMethod = function A_StaticSetter_StaticMethod() {
        "use strict";
        _classCallCheck(this, A_StaticSetter_StaticMethod);
    };
    var _foo53 = {
        get: void 0,
        set: set_foo18
    };
    var A_StaticSetter_StaticGetter = function A_StaticSetter_StaticGetter() {
        "use strict";
        _classCallCheck(this, A_StaticSetter_StaticGetter);
    };
    var _foo54 = {
        get: get_foo20,
        set: set_foo19
    };
    var A_StaticSetter_StaticSetter = function A_StaticSetter_StaticSetter() {
        "use strict";
        _classCallCheck(this, A_StaticSetter_StaticSetter);
    };
    var _foo55 = {
        get: void 0,
        set: set_foo20
    };
}
