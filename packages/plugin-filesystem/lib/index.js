'use strict';

const renameFile = require('./rename-file');
const removeFiles = require('./remove-files');
const removeVimSwapFile = require('./remove-vim-swap-file');
const renameSpecToTest = require('./rename-spec-to-test');
const renameTestToSpec = require('./rename-test-to-spec');
const renameReferencedFile = require('./rename-referenced-file');
const moveReferencedFile = require('./move-referenced-file');
const convertSimpleFilesystemToFilesystem = require('./convert-simple-filesystem-to-filesystem');
const convertFilesystemToSimpleFilesystem = require('./convert-filesystem-to-simple-filesystem');
const convertJsonToJs = require('./convert-json-to-js');
const bundle = require('./bundle');
const replaceCwd = require('./replace-cwd');
const readAllFiles = require('./read-all-files');
const writeAllFiles = require('./write-all-files');
const convertJsToJson = require('./convert-js-to-json');
const removeNycOutputFiles = require('./remove-nyc-output-files');
const removeTravisYmlFile = require('./remove-travis-yml-file');
const removeEmptyDirectory = require('./remove-empty-directory');

module.exports.rules = {
    'remove-vim-swap-file': removeVimSwapFile,
    'remove-files': ['off', removeFiles],
    'rename-file': ['off', renameFile],
    'rename-spec-to-test': ['off', renameSpecToTest],
    'rename-test-to-spec': ['off', renameTestToSpec],
    'rename-referenced-file': ['off', renameReferencedFile],
    'move-referenced-file': ['off', moveReferencedFile],
    'convert-simple-filesystem-to-filesystem': ['off', convertSimpleFilesystemToFilesystem],
    'convert-filesystem-to-simple-filesystem': ['off', convertFilesystemToSimpleFilesystem],
    'bundle': ['off', bundle],
    'replace-cwd': ['off', replaceCwd],
    'read-all-files': ['off', readAllFiles],
    'write-all-files': ['off', writeAllFiles],
    'convert-js-to-json': ['off', convertJsToJson],
    'convert-json-to-js': ['off', convertJsonToJs],
    'remove-nyc-output-files': removeNycOutputFiles,
    'remove-travis-yml-file': removeTravisYmlFile,
    'remove-empty-directory': removeEmptyDirectory,
};
