'use strict';

module.exports.report = () => `Use 'CommonJS' instead of 'ESM'`;

module.exports.replace = () => ({
    'export default __a': 'export = __a',
    'import __a from "__b"': 'import __a = require("__b")',
});
