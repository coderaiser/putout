'use strict';

const block = require('./block');
const staticBlock = require('./static-block');
const pattern = require('./pattern');
const nestedPattern = require('./nested-pattern');
const argument = require('./argument');
const importRule = require('./import');
const exportRule = require('./export');

module.exports.rules = {
    block,
    'static-block': staticBlock,
    pattern,
    'nested-pattern': nestedPattern,
    argument,
    'import': importRule,
    'export': exportRule,
};
