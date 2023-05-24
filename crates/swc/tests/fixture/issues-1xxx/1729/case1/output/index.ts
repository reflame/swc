import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _construct } from "@swc/helpers/_/_construct";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
function createConstructor(callback) {
    var klass;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (klass === undefined) {
            klass = callback();
        }
        return _construct(klass, _to_consumable_array(args));
    };
}
var constructor = createConstructor(function() {
    return function _class() {
        "use strict";
        _class_call_check(this, _class);
    };
});
console.log(constructor());
