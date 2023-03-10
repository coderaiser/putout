const a = 'hello';
const fn = () => a;

const isFn = (a) => typeof a === 'function';
typeof fn === 'function';
typeof a === 'string';
typeof a === 'boolean';
typeof a === 'number';
typeof a === 'undefined';
typeof a === 'symbol';
