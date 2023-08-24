//// [enumBasics.ts]
// Enum without initializers have first member = 0 and successive members = N + 1
(E1 = E11 || (E11 = {}))[E1.A = 0] = "A", E1[E1.B = 1] = "B", E1[E1.C = 2] = "C", E11.A;
// Enum object type is anonymous with properties of the enum type and numeric indexer
var E2, E3, E4, E5, E6, E7, E8, E9, E1, E11, // Enum with only constant members
E21, // Enum with only computed members
E31, // Enum with constant members followed by computed members
E41, // Enum with > 2 constant members with no initializer for first member, non zero initializer for second element
E51, E61, // Enum with computed member initializer of type 'any'
E71, // Enum with computed member initializer of type number
E81, //Enum with computed member intializer of same enum type
E91, e = E11;
E11[e.A], (E2 = E21 || (E21 = {}))[E2.A = 1] = "A", E2[E2.B = 2] = "B", E2[E2.C = 3] = "C", (E3 = E31 || (E31 = {}))[E3.X = 3] = "X", E3[E3.Y = 7] = "Y", E3[E3.Z = NaN] = "Z", (E4 = E41 || (E41 = {}))[E4.X = 0] = "X", E4[E4.Y = 1] = "Y", E4[E4.Z = 3] = "Z", (E5 = E51 || (E51 = {}))[E5.A = 0] = "A", E5[E5.B = 3] = "B", E5[E5.C = 4 // 4
] = "C", (E6 = E61 || (E61 = {}))[E6.A = 0] = "A", E6[E6.B = 0] = "B", E6[E6.C = 1 // 1
] = "C", (E7 = E71 || (E71 = {}))[E7.A = "foo".foo] = "A", (E8 = E81 || (E81 = {}))[E8.B = "foo".foo] = "B", (E9 = E91 || (E91 = {}))[E9.A = 0] = "A", E9[E9.B = 0] = "B", E81.B, E71.A, E41.Z, E31.X, E31.Y, E31.Z, E91.A, E91.B, E61.B, E61.C, E61.A, E51.A, E51.B, E51.C;
