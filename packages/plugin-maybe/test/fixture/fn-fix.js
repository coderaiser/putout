const maybeFn = a => isFn(a) ? a : noop;
const fn1 = maybeFn(a);
const fn2 = maybeFn(a);
