'use strict';

const applySourceCode = require('./apply-source-code');
const applyFilename = require('./apply-filename');
const convertContextToSource = require('./convert-context-to-source');

module.exports.rules = {
    'apply-source-code': applySourceCode,
    'apply-filename': applyFilename,
    'convert-context-to-source': convertContextToSource,
};
