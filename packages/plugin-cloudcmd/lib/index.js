import * as applyInitModule from './apply-init-module/index.js';
import * as convertArrowToDeclaration from './convert-arrow-to-declaration/index.js';
import * as convertIoMvToIoMove from './convert-io-mv-to-io-move/index.js';
import * as convertIoCpToIoCopy from './convert-io-cp-to-io-copy/index.js';
import * as convertIoWriteToIoCreateDirectory from './convert-io-write-to-io-create-directory/index.js';
import * as convertLoadDirToChangeDir from './convert-load-dir-to-change-dir/index.js';

export const rules = {
    'convert-io-mv-to-io-move': convertIoMvToIoMove,
    'convert-io-cp-to-io-copy': convertIoCpToIoCopy,
    'convert-io-write-to-io-create-directory': convertIoWriteToIoCreateDirectory,
    'convert-load-dir-to-change-dir': convertLoadDirToChangeDir,
    'convert-arrow-to-declaration': convertArrowToDeclaration,
    'apply-init-module': applyInitModule,
};
