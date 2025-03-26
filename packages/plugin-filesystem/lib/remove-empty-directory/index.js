import {operator} from 'putout';

const {
    readDirectory,
    getFileType,
    getFilename,
    removeEmptyDirectory,
} = operator;

export const report = (dirPath) => {
    const name = getFilename(dirPath);
    return `Remove empty directory '${name}'`;
};

export const fix = (dirPath) => {
    removeEmptyDirectory(dirPath);
};

export const scan = (path, {push, trackFile}) => {
    for (const dirPath of trackFile(path, '*')) {
        const type = getFileType(dirPath);
        
        if (type !== 'directory')
            continue;
        
        const files = readDirectory(dirPath);
        
        if (files.length)
            continue;
        
        push(dirPath);
    }
};
