'use strict';

module.exports.report = () => `Use 'maybeArray()'`;

module.exports.filter = ({parentPath}) => !parentPath.isFunction();

module.exports.replace = () => ({
    'isArray(__a) ? __a : [__a]': 'maybeArray(__a)',
    'Array.isArray(__a) ? __a : [__a]': 'maybeArray(__a)',
});
