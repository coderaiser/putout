'use strict';

const renameFile = require('./rename-file');
const removeVimSwapFile = require('./remove-vim-swap-file');
const renameSpecToTest = require('./rename-spec-to-test');
const renameTestToSpec = require('./rename-test-to-spec');
const renameReferencedFile = require('./rename-referenced-file');
const moveReferencedFile = require('./move-referenced-file');

module.exports.rules = {
    'remove-vim-swap-file': removeVimSwapFile,
    'rename-file': ['off', renameFile],
    'rename-spec-to-test': ['off', renameSpecToTest],
    'rename-test-to-spec': ['off', renameTestToSpec],
    'rename-referenced-file': ['off', renameReferencedFile],
    'move-referenced-file': ['off', moveReferencedFile],
};
