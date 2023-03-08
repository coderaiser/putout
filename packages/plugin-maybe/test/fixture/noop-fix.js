const maybeFn = a => isFn(a) ? a : noop;
const fn1 = maybeFn(a);
const fn2 = isFn(a) ? a : () => hello();
