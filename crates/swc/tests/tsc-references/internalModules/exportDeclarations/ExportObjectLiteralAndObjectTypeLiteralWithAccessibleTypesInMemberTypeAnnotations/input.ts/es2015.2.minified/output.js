var A;
!function(A1) {
    class Point {
        constructor(x, y){
            this.x = x, this.y = y;
        }
    }
    A1.Origin = {
        x: 0,
        y: 0
    }, A1.Unity = {
        start: new Point(0, 0),
        end: new Point(1, 0)
    };
}(A || (A = {
}));
