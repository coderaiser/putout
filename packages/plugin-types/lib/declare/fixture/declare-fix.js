const isNull = (a) => !a && typeof a === 'object';
const isSymbol = (a) => typeof a === 'symbol';
const isUndefined = (a) => typeof a === 'undefined';
const isBool = (a) => typeof a === 'boolean';
const isFn = (a) => typeof a === 'function';
const isObject = (a) => a && typeof a === 'object';
const isNumber = (a) => !Number.isNaN(a) && typeof a === 'number';
const isString = (a) => typeof a === 'string';

isString(a);
isNumber(a);
isObject(a);
isFn(a);
isBool(a);
isUndefined(a);
isSymbol(a);
isNull(a);
