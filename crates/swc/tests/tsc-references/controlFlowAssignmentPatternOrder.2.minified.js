//// [controlFlowAssignmentPatternOrder.ts]
{
    let b, a = 0;
    [{ [a = 1]: b } = [
        9,
        a
    ]] = [];
}{
    let b, a = 1;
    [{ [a]: b } = [
        9,
        a = 0
    ]] = [];
}{
    let b, a = 0;
    [{ [a = 1]: b } = [
        9,
        a
    ]] = [
        [
            9,
            8
        ]
    ];
}{
    let b, a = 1;
    [{ [a]: b } = [
        a = 0,
        9
    ]] = [
        [
            8,
            9
        ]
    ];
}{
    let b, a = 0;
    [{ [a = 1]: b } = [
        9,
        a
    ]] = [], f();
}{
    let b, a = 1;
    [{ [a]: b } = [
        9,
        a = 0
    ]] = [], f();
}{
    let b, a = 0;
    [{ [a = 1]: b } = [
        9,
        a
    ]] = [
        [
            9,
            8
        ]
    ], f();
}{
    let b, a = 1;
    [{ [a]: b } = [
        a = 0,
        9
    ]] = [
        [
            8,
            9
        ]
    ], f();
}{
    let b, a = 0;
    f(), [{ [a = 1]: b } = [
        9,
        a
    ]] = [];
}{
    let b, a = 1;
    f(), [{ [a]: b } = [
        9,
        a = 0
    ]] = [];
}{
    let b, a = 0;
    f(), [{ [a = 1]: b } = [
        9,
        a
    ]] = [
        [
            9,
            8
        ]
    ];
}{
    let b, a = 1;
    f(), [{ [a]: b } = [
        a = 0,
        9
    ]] = [
        [
            8,
            9
        ]
    ];
}
