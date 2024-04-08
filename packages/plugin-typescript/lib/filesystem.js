'use strict';

const findFile = require('./find-file');
const ctsFile = require('./cts-file');
const mtsFile = require('./mts-file');
const renameFileCtsToTs = require('./rename-file-cts-to-ts');
const renameFileMtsToTs = require('./rename-file-mts-to-ts');

module.exports = {
    'find-file': ['off', findFile],
    'cts-file': ['off', ctsFile],
    'mts-file': ['off', mtsFile],
    'rename-file-cts-to-ts': ['off', renameFileCtsToTs],
    'rename-file-mts-to-ts': ['off', renameFileMtsToTs],
};
