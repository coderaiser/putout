const callWith = (a) => (fn) => fn(a);
const id = (a) => a;
const not = (fn) => (...a) => !fn(...a);
const notOK = not(isOK);
const a = `${id('hello')}`;

[].some(callWith(a));
