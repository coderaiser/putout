'use strict';

module.exports.declare = () => ({
    maybeArray: 'const maybeArray = (a) => isArray(a) ? a : [a]',
    maybeEmptyArray: 'const maybeEmptyArray = (a) => !a ? [] : a',
    maybeFn: 'const maybeFn = (a) => isFn(a) ? a : noop',
});
