'use strict';

const {
    mkdirSync: mkdirSyncOriginal,
    renameSync: renameSyncOriginal,
    rmSync: rmSyncOriginal,
    readFileSync: readFileSyncOriginal,
    writeFileSync: writeFileSyncOriginal,
    copyFileSync: copyFileSyncOriginal,
    constants,
} = require('fs');

const {COPYFILE_FICLONE} = constants;

module.exports.renameFile = (from, to, {renameSync = renameSyncOriginal} = {}) => {
    renameSync(from, to);
};

module.exports.copyFile = (from, to, {copyFileSync = copyFileSyncOriginal} = {}) => {
    copyFileSync(from, to, COPYFILE_FICLONE);
};

module.exports.removeFile = (filename, {rmSync = rmSyncOriginal} = {}) => {
    rmSync(filename, {
        recursive: true,
    });
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
