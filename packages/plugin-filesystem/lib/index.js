import * as renameFile from './rename-file/index.js';
import * as removeFiles from './remove-files/index.js';
import * as removeVimSwapFile from './remove-vim-swap-file/index.js';
import * as renameSpecToTest from './rename-spec-to-test/index.js';
import * as renameTestToSpec from './rename-test-to-spec/index.js';
import * as renameReferencedFile from './rename-referenced-file/index.js';
import * as moveReferencedFile from './move-referenced-file/index.js';
import * as convertSimpleFilesystemToFilesystem from './convert-simple-filesystem-to-filesystem/index.cjs';
import * as convertFilesystemToSimpleFilesystem from './convert-filesystem-to-simple-filesystem/index.cjs';
import * as convertJsonToJs from './convert-json-to-js/index.js';
import * as bundle from './bundle/index.js';
import * as replaceCwd from './replace-cwd/index.js';
import * as readAllFiles from './read-all-files/index.js';
import * as writeAllFiles from './write-all-files/index.js';
import * as convertJsToJson from './convert-js-to-json/index.js';
import * as removeNycOutputFiles from './remove-nyc-output-files/index.js';
import * as removeTravisYmlFile from './remove-travis-yml-file/index.js';
import * as removeEmptyDirectory from './remove-empty-directory/index.js';

export const rules = {
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
