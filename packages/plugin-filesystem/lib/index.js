'use strict';

const renameFile = require('./rename-file');
const removeVimSwapFile = require('./remove-vim-swap-file');
const renameSpecToTest = require('./rename-spec-to-test');

module.exports.rules = {
    'remove-vim-swap-file': removeVimSwapFile,
    'rename-file': ['off', renameFile],
    'rename-spec-to-test': ['off', renameSpecToTest],
};
