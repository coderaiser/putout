'use strict';

module.exports.declare = () => ({
    isString: `const isString = (a) => typeof a === 'string'`,
    isEmptyString: `const isEmptyString = (a) => !a && isString(a)`,
    isNumber: `const isNumber = (a) => typeof a === 'number'`,
    isFn: `const isFn = (a) => typeof a === 'function'`,
    isBool: `const isBool = (a) => typeof a === 'boolean'`,
    isObject: `const isObject = (a) => a && typeof a === 'object'`,
    isUndefined: `const isUndefined = (a) => typeof a === 'undefined'`,
    isSymbol: `const isSymbol = (a) => typeof a === 'symbol'`,
    isNull: `const isNull = (a) => !a && typeof a === 'object'`,
});

