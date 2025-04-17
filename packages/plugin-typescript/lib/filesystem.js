import * as findFile from './find-file/index.js';
import * as ctsFile from './cts-file/index.js';
import * as mtsFile from './mts-file/index.js';
import * as renameFileCtsToTs from './rename-file-cts-to-ts/index.js';
import * as renameFileMtsToTs from './rename-file-mts-to-ts/index.js';

export default {
    'find-file': ['off', findFile],
    'cts-file': ['off', ctsFile],
    'mts-file': ['off', mtsFile],
    'rename-file-cts-to-ts': ['off', renameFileCtsToTs],
    'rename-file-mts-to-ts': ['off', renameFileMtsToTs],
};
