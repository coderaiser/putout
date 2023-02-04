const fn1 = isFn(a) ? a : noop;
const fn2 = isFn(a) ? a : () => hello();
const fn3 = isFn(a) ? a : () => {
    abc();
}
