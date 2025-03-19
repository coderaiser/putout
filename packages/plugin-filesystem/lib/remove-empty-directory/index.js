'use strict';

const {operator} = require('putout');
const {
    readDirectory,
    getFileType,
    getFilename,
    removeEmptyDirectory,
} = operator;

module.exports.report = (dirPath) => {
    const name = getFilename(dirPath);
    return `Remove empty directory '${name}'`;
};

module.exports.fix = (dirPath) => {
    removeEmptyDirectory(dirPath);
};

module.exports.scan = (path, {push, trackFile}) => {
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
