var // -- operator on enum type
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
var ResultIsNumber1 = --ENUM;
var ResultIsNumber2 = --ENUM1;
var ResultIsNumber3 = ENUM--;
var ResultIsNumber4 = ENUM1--;
// enum type expressions
var ResultIsNumber5 = --ENUM["A"] + ENUM.B;
var ResultIsNumber6 = ENUM.A + ENUM["B"]--;
// miss assignment operator
--ENUM;
--ENUM1;
ENUM--;
ENUM1--;
