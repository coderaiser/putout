'use strict';

const applySourceCode = require('./apply-source-code');
const applyFilename = require('./apply-filename');

module.exports.rules = {
    'apply-source-code': applySourceCode,
    'apply-filename': applyFilename,
};
