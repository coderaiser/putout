function foo(x) {
  return function () {
    if (x === 0) {
      return 1;
    } else {
      return function () {
        if (x === 1) {
          return 1;
        } else {
          return 2;
        }
      }();
    }
  }();
}
foo(1);
