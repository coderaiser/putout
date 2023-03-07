const fn1 = isFn(a) ? a : () => {};
const fn2 = isFn(a) ? a : () => hello();
const fn3 = isFn(a) ? a : () => {
    abc();
}
