function method() {
    const obj = {};
    obj.prop ??= "x".repeat(10000000);
  }
  
  method();
  // the large string should be eventually GCed along with the large string, but it will never happen in SWC+es2020