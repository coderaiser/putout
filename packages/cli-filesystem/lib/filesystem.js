'use strict';

const {
    mkdirSync: mkdirSyncOriginal,
    renameSync: renameSyncOriginal,
    rmSync: rmSyncOriginal,
    readFileSync: readFileSyncOriginal,
    writeFileSync: writeFileSyncOriginal,
} = require('fs');

module.exports.renameFile = (from, to, {renameSync = renameSyncOriginal} = {}) => {
    renameSync(from, to);
};

module.exports.removeFile = (filename, {rmSync = rmSyncOriginal} = {}) => {
    rmSync(filename);
};

module.exports.createDirectory = (name, {mkdirSync = mkdirSyncOriginal} = {}) => {
    mkdirSync(name);
};

module.exports.readFileContent = (name, {readFileSync = readFileSyncOriginal} = {}) => {
    return readFileSync(name, 'utf8');
};

module.exports.writeFileContent = (name, content, {writeFileSync = writeFileSyncOriginal} = {}) => {
    writeFileSync(name, content);
};
