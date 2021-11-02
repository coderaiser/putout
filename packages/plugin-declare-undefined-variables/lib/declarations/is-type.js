'use strict';

module.exports = {
    isString: `const isString = (a) => typeof a === 'string'`,
    isNumber: `const isNumber = (a) => typeof a === 'number'`,
    isFn: `const isFn = (a) => typeof a === 'function'`,
    isBool: `const isBool = (a) => typeof a === 'boolean'`,
    isObject: `const isObject = (a) => a && typeof a === 'object'`,
    isUndefined: `const isUndefined = (a) => typeof a === 'undefined'`,
};

