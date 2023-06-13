'use strict';

module.exports.report = () => '"fs/promises" should be used instead of "fs.promises"';

module.exports.replace = () => ({
    'const __a = require("fs").promises': 'const __a = require("fs/promises")',
});
