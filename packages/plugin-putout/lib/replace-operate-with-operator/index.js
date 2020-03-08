'use strict';

module.exports.report = () => '"operator" should be used instead of "operate"';

module.exports.replace = () => ({
    'const __object = require("putout").operate': 'const __object = require("putout").operator',
});

