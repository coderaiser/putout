'use strict';

const renameFile = require('./rename-file');
const removeVimSwapFile = require('./remove-vim-swap-file');

module.exports.rules = {
    'rename-file': renameFile,
    'remove-vim-swap-file': removeVimSwapFile,
};
