import * as removeUselessProcessExit from './remove-useless-process-exit/index.js';
import * as applyPrivatelyRequiredFiles from './apply-privately-required-file/index.js';
import * as convertBufferToBufferAlloc from './convert-buffer-to-buffer-alloc/index.js';
import * as convertFsPromises from './convert-fs-promises/index.js';
import * as convertPromisifyToFsPromises from './convert-promisify-to-fs-promises/index.js';
import * as convertDirnameToUrl from './convert-dirname-to-url/index.js';
import * as convertUrlToDirname from './convert-url-to-dirname/index.js';
import * as convertTopLevelReturn from './convert-top-level-return/index.js';
import * as declare from './declare/index.js';
import * as declareAfterRequire from './declare-after-require/index.js';
import * as removeProcessExit from './remove-process-exit/index.js';
import * as addNodePrefix from './add-node-prefix/index.js';
import * as convertExportsToModuleExports from './convert-exports-to-module-exports/index.js';
import * as convertEsmToCommonjs from './convert-esm-to-commonjs/index.js';
import * as convertCommonjsToEsm from './convert-commonjs-to-esm/index.js';
import * as cjsFile from './cjs-file/index.js';
import * as mjsFile from './mjs-file/index.js';
import * as renameFileCjsToJs from './rename-file-cjs-to-js/index.js';
import * as renameFileMjsToJs from './rename-file-mjs-to-js/index.js';
import * as strictMode from './strict-mode/index.js';
import * as removeUselessPromisify from './remove-useless-promisify/index.js';
import * as groupRequireById from './group-require-by-id/index.js';

export const rules = {
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
    
    'apply-privately-required-files': ['off', applyPrivatelyRequiredFiles],
    'convert-esm-to-commonjs': ['off', convertEsmToCommonjs],
    'convert-commonjs-to-esm/exports': ['off', convertCommonjsToEsm.rules.exports],
    'convert-commonjs-to-esm/common': ['off', convertCommonjsToEsm.rules.commons],
    'convert-commonjs-to-esm/require': ['off', convertCommonjsToEsm.rules.require],
    
    'cjs-file': ['off', cjsFile],
    'mjs-file': ['off', mjsFile],
    
    'rename-file-cjs-to-js': ['off', renameFileCjsToJs],
    'rename-file-mjs-to-js': ['off', renameFileMjsToJs],
    
    'add-missing-strict-mode': strictMode.rules['add-missing'],
    'remove-useless-strict-mode': strictMode.rules['remove-useless'],
    'remove-illegal-strict-mode': strictMode.rules['remove-illegal'],
    'remove-useless-promisify': removeUselessPromisify,
    'group-require-by-id': groupRequireById,
    'remove-useless-process-exit': removeUselessProcessExit,
};
