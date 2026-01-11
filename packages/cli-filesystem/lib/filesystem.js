import {dirname} from 'node:path';
import {
    mkdirSync as mkdirSyncOriginal,
    renameSync as renameSyncOriginal,
    rmSync as rmSyncOriginal,
    readFileSync as readFileSyncOriginal,
    writeFileSync as writeFileSyncOriginal,
    copyFileSync as copyFileSyncOriginal,
    constants,
} from 'node:fs';

const {COPYFILE_FICLONE} = constants;

export const renameFile = (from, to, overrides = {}) => {
    const {
        renameSync = renameSyncOriginal,
    } = overrides;
    
    renameSync(from, to);
};

export const copyFile = (from, to, overrides = {}) => {
    const {
        copyFileSync = copyFileSyncOriginal,
    } = overrides;
    
    copyFileSync(from, to, COPYFILE_FICLONE);
};

export const removeFile = (filename, {rmSync = rmSyncOriginal} = {}) => {
    rmSync(filename, {
        recursive: true,
        force: true,
    });
};

export function createDirectory(name, {mkdirSync = mkdirSyncOriginal} = {}) {
    mkdirSync(name, {
        recursive: true,
    });
}

export const readFileContent = (name, {readFileSync = readFileSyncOriginal} = {}) => {
    return readFileSync(name, 'utf8');
};

export const writeFileContent = (name, content, overrides = {}) => {
    const {
        writeFileSync = writeFileSyncOriginal,
        mkdirSync = mkdirSyncOriginal,
    } = overrides;
    
    createDirectory(dirname(name), {
        mkdirSync,
    });
    
    writeFileSync(name, content);
};
