//// [awaitCallExpression3_es5.ts]
import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
function func() {
    return _func.apply(this, arguments);
}
function _func() {
    _func = _async_to_generator(function() {
        var b, _tmp;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    before();
                    _tmp = [
                        a
                    ];
                    return [
                        4,
                        p
                    ];
                case 1:
                    b = fn.apply(void 0, _tmp.concat([
                        _state.sent(),
                        a
                    ]));
                    after();
                    return [
                        2
                    ];
            }
        });
    });
    return _func.apply(this, arguments);
}
