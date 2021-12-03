const not = fn => (...a) => !fn(...a);
const notOK = not(isOK);
