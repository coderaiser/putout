'use strict';

const {dirname} = require('node:path');
const {
    mkdirSync: mkdirSyncOriginal,
    renameSync: renameSyncOriginal,
    rmSync: rmSyncOriginal,
    readFileSync: readFileSyncOriginal,
    writeFileSync: writeFileSyncOriginal,
    copyFileSync: copyFileSyncOriginal,
    constants,
} = require('node:fs');

const {COPYFILE_FICLONE} = constants;

module.exports.renameFile = (from, to, overrides = {}) => {
    const {
        renameSync = renameSyncOriginal,
    } = overrides;
    
    renameSync(from, to);
};

module.exports.copyFile = (from, to, overrides = {}) => {
    const {
        copyFileSync = copyFileSyncOriginal,
    } = overrides;
    
    copyFileSync(from, to, COPYFILE_FICLONE);
};

module.exports.removeFile = (filename, {rmSync = rmSyncOriginal} = {}) => {
    rmSync(filename, {
        recursive: true,
        force: true,
    });
};

module.exports.createDirectory = createDirectory;
function createDirectory(name, {mkdirSync = mkdirSyncOriginal} = {}) {
    mkdirSync(name, {
        recursive: true,
    });
}

module.exports.readFileContent = (name, {readFileSync = readFileSyncOriginal} = {}) => {
    return readFileSync(name, 'utf8');
};

module.exports.writeFileContent = (name, content, overrides = {}) => {
    const {
        writeFileSync = writeFileSyncOriginal,
        mkdirSync = mkdirSyncOriginal,
    } = overrides;
    
    createDirectory(dirname(name), {
        mkdirSync,
    });
    
    writeFileSync(name, content);
};
