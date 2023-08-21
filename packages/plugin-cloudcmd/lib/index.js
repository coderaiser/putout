'use strict';

const convertIoMvToIoMove = require('./convert-io-mv-to-io-move');
const convertIoCpToIoCopy = require('./convert-io-cp-to-io-copy');
const convertIoWriteToIoCreateDirectory = require('./convert-io-write-to-io-create-directory');
const convertLoadDirToChangeDir = require('./convert-load-dir-to-change-dir');

module.exports.rules = {
    'convert-io-mv-to-io-move': convertIoMvToIoMove,
    'convert-io-cp-to-io-copy': convertIoCpToIoCopy,
    'convert-io-write-to-io-create-directory': convertIoWriteToIoCreateDirectory,
    'convert-load-dir-to-change-dir': convertLoadDirToChangeDir,
};
