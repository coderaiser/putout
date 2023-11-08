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
};
