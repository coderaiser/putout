'use strict';

const check = (vars, path) => !path.parentPath.isBinaryExpression();

module.exports.report = () => `Use minified types`;

module.exports.match = () => ({
    true: check,
    false: check,
});

module.exports.replace = () => ({
    undefined: 'void 0',
    true: '!0',
    false: '!1',
});
