//// [controlFlowOptionalChain.ts]
import "@swc/helpers/_/_instanceof";
import "@swc/helpers/_/_type_of";
function someFunction(someOptionalObject) {
    (null == someOptionalObject ? void 0 : someOptionalObject.someProperty) !== lastSomeProperty && (console.log(someOptionalObject), console.log(someOptionalObject.someProperty), lastSomeProperty = null == someOptionalObject ? void 0 : someOptionalObject.someProperty);
}
null == o || o[a = 1], a.toString(), null == o || o.x[b = 1], b.toString(), null == o || o(c = 1), c.toString(), null == o || o.x(d = 1), d.toString(), null == f || f(x), x, f, f(x), x, f, f(x), (null == o2 ? void 0 : o2.f(x)) ? (x, o2.f, null == o2 || o2.f, null == o2 || o2.f(x)) : (x, o2, null == o2 || o2.f, o2.f), x, o2, null == o2 || o2.f, o2.f, (null == o3 ? void 0 : o3.x) === 1 ? (o3, o3.x, null == o3 || o3.x) : (o3, null == o3 || o3.x, o3.x), o3, null == o3 || o3.x, o3.x, (null === (_o4_x = o4.x) || void 0 === _o4_x ? void 0 : _o4_x.y) ? (o4.x, o4.x.y, null === (_o4_x2 = o4.x) || void 0 === _o4_x2 || _o4_x2.y) : (o4.x, null === (_o4_x3 = o4.x) || void 0 === _o4_x3 || _o4_x3.y, o4.x.y), o4.x, null === (_o4_x1 = o4.x) || void 0 === _o4_x1 || _o4_x1.y, o4.x.y, (null === (_o5_x = o5.x) || void 0 === _o5_x ? void 0 : null === (_o5_x_y_z = _o5_x.y.z) || void 0 === _o5_x_y_z ? void 0 : _o5_x_y_z.w) ? (o5.x, o5.x.y, o5.x.y.z, o5.x.y.z.w, null === (_o5_x_y_z2 = o5.x.y.z) || void 0 === _o5_x_y_z2 || _o5_x_y_z2.w, null === (_o5_x4 = o5.x) || void 0 === _o5_x4 || _o5_x4.y.z.w, null === (_o5_x5 = o5.x) || void 0 === _o5_x5 || null === (_o5_x_y_z3 = _o5_x5.y.z) || void 0 === _o5_x_y_z3 || _o5_x_y_z3.w) : (o5.x, null === (_o5_x6 = o5.x) || void 0 === _o5_x6 || _o5_x6.y, null === (_o5_x7 = o5.x) || void 0 === _o5_x7 || _o5_x7.y.z, null === (_o5_x8 = o5.x) || void 0 === _o5_x8 || null === (_o5_x_y_z4 = _o5_x8.y.z) || void 0 === _o5_x_y_z4 || _o5_x_y_z4.w, o5.x.y, o5.x.y.z.w), o5.x, null === (_o5_x1 = o5.x) || void 0 === _o5_x1 || _o5_x1.y, null === (_o5_x2 = o5.x) || void 0 === _o5_x2 || _o5_x2.y.z, null === (_o5_x3 = o5.x) || void 0 === _o5_x3 || null === (_o5_x_y_z1 = _o5_x3.y.z) || void 0 === _o5_x_y_z1 || _o5_x_y_z1.w, o5.x.y, o5.x.y.z.w, (null == o6 ? void 0 : o6.f()) ? o6 : (o6, null == o6 || o6.f), o6.f, o6, null == o6 || o6.f, o6.f, someFunction({
    someProperty: 42
}), someFunction(void 0);
for(var _o4_x, _o4_x1, _o5_x_y_z, _o5_x, _o5_x1, _o5_x2, _o5_x_y_z1, _o5_x3, _arr_i, a, b, c, d, _o4_x2, _o4_x3, _o5_x_y_z2, _o5_x4, _o5_x_y_z3, _o5_x5, _o5_x6, _o5_x7, _o5_x_y_z4, _o5_x8, lastSomeProperty, _arr_i1, i = 0; (null === (_arr_i = arr[i]) || void 0 === _arr_i ? void 0 : _arr_i.tag) === "left";)i += 1, (null === (_arr_i1 = arr[i]) || void 0 === _arr_i1 ? void 0 : _arr_i1.tag) === "right" && console.log("I should ALSO be reachable");
