'use strict';

module.exports.report = () => `Use 'maybeEmptyArray()'`;

module.exports.filter = ({parentPath}) => !parentPath.isFunction();

module.exports.replace = () => ({
    '!__a ? [] :__a': 'maybeEmptyArray(__a)',
});
