//// [ClassAndModuleThatMergeWithModulesExportedStaticFunctionUsingClassPrivateStatics.ts]
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
var clodule = function() {
    function clodule() {
        _class_call_check(this, clodule);
    }
    return clodule.sfn = function(id) {
        return 42;
    }, clodule;
}();
(clodule || (clodule = {})).fn = function(x, y) {
    return clodule.sfn("a");
};
