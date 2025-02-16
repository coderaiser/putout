'use strict';

module.exports.declare = () => ({
    isString: `const isString = (a) => typeof a === 'string'`,
    isEmptyString: `const isEmptyString = (a) => !a && isString(a)`,
    isNumber: `const isNumber = (a) => !Number.isNaN(a) && typeof a === 'number'`,
    isNumberLike: `const isNumberLike = (a, b = Number(a)) => isNumber(b)`,
    isFn: `const isFn = (a) => typeof a === 'function'`,
    isBool: `const isBool = (a) => typeof a === 'boolean'`,
    isObject: `const isObject = (a) => a && typeof a === 'object'`,
    isUndefined: `const isUndefined = (a) => typeof a === 'undefined'`,
    isSymbol: `const isSymbol = (a) => typeof a === 'symbol'`,
    isBigInt: `const isBigInt = (a) => typeof a === 'bigint'`,
    isNull: `const isNull = (a) => !a && typeof a === 'object'`,
    isArray: 'const {isArray} = Array',
    isEmptyArray: 'const isEmptyArray = (a) => isArray(a) && !a.length',
    isError: 'const isError = (a) => a instanceof Error',
});
