var _init_a, _initProto;
const dec = () => { };
class Foo {
  constructor() {
    defineProperty(this, "a", (_initProto(this), _init_a(this, 123)));
  }
  a() {
    return 1;
  }
}
[_init_a, _initProto] = _applyDecs2203R(Foo, [[dec, 2, "a"], [dec, 0, "a"]], []).e;
