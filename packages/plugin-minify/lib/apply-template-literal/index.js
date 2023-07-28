'use strict';

module.exports.report = () => `Use 'template literal' to stringify value`;
module.exports.replace = () => ({
    'String(__a)': '`${__a}`',
    '__a.toString()': '`${__a}`',
});
