'use strict';

const convertBufferToBufferAlloc = require('./convert-buffer-to-buffer-alloc');
const convertFsPromises = require('./convert-fs-promises');
const convertPromisifyToFsPromises = require('./convert-promisify-to-fs-promises');
const convertDirnameToUrl = require('./convert-dirname-to-url');
const convertUrlToDirname = require('./convert-url-to-dirname');
const convertTopLevelReturn = require('./convert-top-level-return');
const declare = require('./declare');
const declareAfterRequire = require('./declare-after-require');
const removeProcessExit = require('./remove-process-exit');
const addNodePrefix = require('./add-node-prefix');
const convertExportsToModuleExports = require('./convert-exports-to-module-exports');

const convertEsmToCommonjs = require('./convert-esm-to-commonjs');

const convertCommonjsToEsmExports = require('./convert-commonjs-to-esm-exports');
const convertCommonjsToEsmCommons = require('./convert-commonjs-to-esm-commons');
const convertCommonjsToEsmRequire = require('./convert-commonjs-to-esm-require');

const cjsFile = require('./cjs-file');
const mjsFile = require('./mjs-file');

const renameFileCjsToJs = require('./rename-file-cjs-to-js');
const renameFileMjsToJs = require('./rename-file-mjs-to-js');

const strictMode = require('./strict-mode');
const removeUselessPromisify = require('./remove-useless-promisify');
const groupRequireById = require('./group-require-by-id');

module.exports.rules = {
    'convert-buffer-to-buffer-alloc': convertBufferToBufferAlloc,
    'convert-fs-promises': convertFsPromises,
    'convert-promisify-to-fs-promises': convertPromisifyToFsPromises,
    'convert-dirname-to-url': convertDirnameToUrl,
    'convert-url-to-dirname': convertUrlToDirname,
    'convert-top-level-return': convertTopLevelReturn,
    declare,
    'declare-after-require': declareAfterRequire,
    'remove-process-exit': removeProcessExit,
    'add-node-prefix': addNodePrefix,
    'convert-exports-to-module-exports': convertExportsToModuleExports,
    
    'convert-esm-to-commonjs': ['off', convertEsmToCommonjs],
    'convert-commonjs-to-esm-exports': ['off', convertCommonjsToEsmExports],
    'convert-commonjs-to-esm-common': ['off', convertCommonjsToEsmCommons],
    'convert-commonjs-to-esm-require': ['off', convertCommonjsToEsmRequire],
    
    'cjs-file': ['off', cjsFile],
    'mjs-file': ['off', mjsFile],
    
    'rename-file-cjs-to-js': ['off', renameFileCjsToJs],
    'rename-file-mjs-to-js': ['off', renameFileMjsToJs],
    
    'add-missing-strict-mode': strictMode.rules['add-missing'],
    'remove-useless-strict-mode': strictMode.rules['remove-useless'],
    'remove-illegal-strict-mode': strictMode.rules['remove-illegal'],
    'remove-useless-promisify': removeUselessPromisify,
    'group-require-by-id': groupRequireById,
};
