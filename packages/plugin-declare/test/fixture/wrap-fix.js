const id = a => a;
const not = fn => (...a) => !fn(...a);
const notOK = not(isOK);
const a = `${id('hello')}`;
