'use strict';

module.exports = {
    maybeArray: 'const maybeArray = (a) => isArray(a) ? a : [a]',
    maybeEmptyArray: 'const maybeEmptyArray = (a) => !a ? [] : a',
    maybeFn: 'const maybeFn = (a) => isFn(a) ? a : noop',
};
