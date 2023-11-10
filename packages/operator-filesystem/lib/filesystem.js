'use strict';

const {
    setLiteralValue,
    getProperty,
    traverseProperties,
} = require('@putout/operate');

const maybeFS = require('./maybe-fs');

const getRegExp = (wildcard) => {
    const escaped = wildcard
        .replace(/\./g, '\\.')
        .replace(/\*/g, '.*')
        .replace('?', '.?');
    
    return RegExp(`${escaped}$`);
};

module.exports.findFile = (node, name) => {
    const filePaths = [];
    
    for (const filenamePath of traverseProperties(node, 'filename')) {
        const {value} = filenamePath.node.value;
        
        if (value === name || getRegExp(name).test(value)) {
            filePaths.push(filenamePath.parentPath);
        }
    }
    
    return filePaths;
};

function getFilenamePath(filePath) {
    const filenamePath = getProperty(filePath, 'filename');
    return filenamePath.get('value');
}

function getFilename(filePath) {
    const {value} = getFilenamePath(filePath).node;
    return value;
}

module.exports.getFilename = getFilename;

module.exports.renameFile = (filePath, name) => {
    const oldName = getFilename(filePath);
    const valuePath = getFilenamePath(filePath);
    const baseName = oldName
        .split('/')
        .pop();
    
    const newName = oldName.replace(baseName, name);
    
    setLiteralValue(valuePath, newName);
    maybeFS.renameFile(oldName, newName);
};

module.exports.removeFile = (filePath) => {
    const filename = getFilename(filePath);
    
    filePath.remove();
    maybeFS.removeFile(filename);
};

module.exports.moveFile = (filePath, dirPath) => {
    const dirname = getFilename(dirPath);
    const filename = getFilename(filePath);
    const dirPathFiles = getProperty(dirPath, 'files');
    
    dirPathFiles.node.value.elements.push(filePath.node);
    filePath.remove();
    
    const basename = filename
        .split('/')
        .pop();
    
    maybeFS.renameFile(filename, `${dirname}/${basename}`);
};

module.exports.init = maybeFS.init;
module.exports.deinit = maybeFS.deinit;
