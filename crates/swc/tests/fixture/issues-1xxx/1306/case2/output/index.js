import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _class_private_field_get } from "@swc/helpers/_/_class_private_field_get";
import { _ as _class_private_field_init } from "@swc/helpers/_/_class_private_field_init";
import { _ as _class_private_field_set } from "@swc/helpers/_/_class_private_field_set";
import { _ as _create_class } from "@swc/helpers/_/_create_class";
var _name = /*#__PURE__*/ new WeakMap();
var Animal = /*#__PURE__*/ function() {
    "use strict";
    function Animal(name) {
        _class_call_check(this, Animal);
        _class_private_field_init(this, _name, {
            writable: true,
            value: void 0
        });
        _class_private_field_set(this, _name, name);
    }
    _create_class(Animal, [
        {
            key: "noise",
            value: function noise() {
                return _class_private_field_get(this, _name).toUpperCase();
            }
        }
    ]);
    return Animal;
}();
