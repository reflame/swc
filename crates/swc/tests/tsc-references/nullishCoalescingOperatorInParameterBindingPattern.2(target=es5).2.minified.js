//// [nullishCoalescingOperatorInParameterBindingPattern.2.ts]
// https://github.com/microsoft/TypeScript/issues/36295
var param, _a, _a1, a = function() {};
(void 0)[null !== (_a = a()) && void 0 !== _a ? _a : "d"], param[null !== (_a1 = a()) && void 0 !== _a1 ? _a1 : "d"], param.d;
