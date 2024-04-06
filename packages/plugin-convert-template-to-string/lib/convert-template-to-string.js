'use strict';

module.exports.report = () => 'Avoid using Template string with only one expression';

module.exports.match = () => ({
    '`${__a}`': (vars, path) => {
        const {parentPath} = path;
        return !parentPath.isTaggedTemplateExpression();
    },
});

module.exports.replace = () => ({
    '`${__a}`': 'String(__a)',
});
