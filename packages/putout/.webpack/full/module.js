'use strict';

module.exports._findPath = (a) => a;

const codegen = require('codegen.macro');
module.exports.plugins = codegen`module.exports = require('./require-all')();`;

