const isSymbol = a => typeof a === 'symbol';
const isUndefined = a => typeof a === 'undefined';
const isNumber = a => typeof a === 'number';
const isBool = a => typeof a === 'boolean';
const isString = a => typeof a === 'string';
const a = 'hello';
const fn = () => a;

const isFn = (a) => typeof a === 'function';
isFn(fn);
isString(a);
isBool(a);
isNumber(a);
isUndefined(a);
isSymbol(a);
