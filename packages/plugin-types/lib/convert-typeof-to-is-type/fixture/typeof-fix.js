const a = 'hello';
const fn = () => a;

const isFn = (a) => typeof a === 'function';
isFn(fn);
isString(a);
isBool(a);
isNumber(a);
isUndefined(a);
isSymbol(a);
