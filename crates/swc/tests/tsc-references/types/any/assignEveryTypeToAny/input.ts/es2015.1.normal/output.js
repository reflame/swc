// all of these are valid
var x;
x = 1;
var a = 2;
x = a;
x = true;
var b = true;
x = b;
x = "";
var c = "";
x = c;
var d;
x = d;
var e = undefined;
x = e;
var e2;
x = e2;
var E;
(function(E1) {
    E1[E1["A"] = 0] = "A";
})(E || (E = {
}));
x = E.A;
var f = E.A;
x = f;
var g;
x = g;
class C {
}
var h;
x = h;
var i;
x = i;
x = {
    f () {
        return 1;
    }
};
x = {
    f (x1) {
        return x1;
    }
};
function j(a1) {
    x = a1;
}
