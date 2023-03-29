const isString = a => typeof a === 'string';
const isEmptyString = a => !a && isString(a);
isEmptyString(a);
