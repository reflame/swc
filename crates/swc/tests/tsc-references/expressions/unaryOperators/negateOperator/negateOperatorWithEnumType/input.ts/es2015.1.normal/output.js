var // - operator on enum type
ENUM;
(function(ENUM) {
})(ENUM || (ENUM = {
}));
var ENUM1;
(function(ENUM11) {
    ENUM11[ENUM11["A"] = 0] = "A";
    ENUM11[ENUM11["B"] = 1] = "B";
    ENUM11[ENUM11[""] = 2] = "";
})(ENUM1 || (ENUM1 = {
}));
// enum type var
var ResultIsNumber1 = -ENUM;
// expressions
var ResultIsNumber2 = -ENUM1["B"];
var ResultIsNumber3 = -(ENUM1.B + ENUM1[""]);
// miss assignment operators
-ENUM;
-ENUM1;
-ENUM1["B"];
-ENUM, ENUM1;
