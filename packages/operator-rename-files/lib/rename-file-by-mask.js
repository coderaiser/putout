import {basename} from 'node:path';
import {
    readDirectory,
    renameFile,
    getFilename,
    getFileType,
    getParentDirectory,
} from '@putout/operator-filesystem';

const returns = (a) => () => a;

export const report = (path, {mask, from, to}) => {
    if (!mask)
        return `Rename '${from}' to '${to}'`;
    
    return `Rename '${mask}' to '${mask.replace(from, to)}'`;
};

export const fix = (path, {from, to}) => {
    const filename = getFilename(path);
    const newFilename = filename.replace(from, to);
    
    renameFile(path, newFilename);
};

export const createScan = (baseOptions) => (rootPath, {push, options, trackFile}) => {
    const from = options.from || baseOptions.from;
    const to = options.to || baseOptions.to;
    const mask = options.mask || baseOptions.mask;
    const near = options.near || baseOptions.near;
    const checkNear = near ? createCheckNear(near) : returns(true);
    
    if (!from || !to)
        return {};
    
    for (const file of trackFile(rootPath, mask || from).filter(checkNear)) {
        push(file, {
            from,
            to,
            mask,
        });
    }
};

const createCheckNear = (near) => (file) => {
    const parentDirectory = getParentDirectory(file);
    
    for (const currentFile of readDirectory(parentDirectory)) {
        const type = getFileType(currentFile);
        
        if (type !== 'file')
            continue;
        
        const name = getFilename(currentFile);
        const base = basename(name);
        
        if (base === near)
            return true;
    }
    
    return false;
};
