'use strict';

module.exports.report = () => `Use 'ESM' instead of 'CommonJS'`;

module.exports.replace = () => ({
    'export = __a': 'export default __a',
    'import __a = require("__b")': 'import __a from "__b"',
});
