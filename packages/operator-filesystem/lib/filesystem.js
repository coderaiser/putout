'use strict';

const {types} = require('putout');
const {
    setLiteralValue,
    getProperty,
    traverseProperties,
} = require('@putout/operate');

const maybeFS = require('./maybe-fs');

const {
    ObjectExpression,
    ArrayExpression,
    StringLiteral,
    ObjectProperty,
    isProgram,
} = types;

const getRegExp = (wildcard) => {
    const escaped = wildcard
        .replace(/\./g, '\\.')
        .replace(/\*/g, '.*')
        .replace('?', '.?');
    
    return RegExp(`${escaped}$`);
};

module.exports.getParentDirectory = (filePath) => {
    const {parentPath} = filePath.parentPath.parentPath;
    
    if (isProgram(parentPath))
        return null;
    
    return parentPath;
};

module.exports.findFile = (node, name) => {
    const filePaths = [];
    
    for (const filenamePath of traverseProperties(node, 'filename')) {
        const {value} = filenamePath.node.value;
        
        if (value === name || getRegExp(name).test(value))
            filePaths.push(filenamePath.parentPath);
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

function getFileContent(filePath) {
    const content = getProperty(filePath, 'content');
    return [
        Boolean(content),
        content?.node.value.value,
    ];
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
    const filenamePath = getProperty(filePath, 'filename');
    
    const basename = filename
        .split('/')
        .pop();
    
    const newname = `${dirname}/${basename}`;
    
    setLiteralValue(filenamePath.get('value'), newname);
    dirPathFiles.node.value.elements.push(filePath.node);
    filePath.remove();
    
    maybeFS.renameFile(filename, newname);
};

const createType = (type) => ObjectProperty(StringLiteral('type'), StringLiteral(type));
const createFiles = (files) => ObjectProperty(StringLiteral('files'), ArrayExpression(files));
const createFilename = (filename) => ObjectProperty(StringLiteral('filename'), StringLiteral(filename));

module.exports.createDirectory = (dirPath, name) => {
    const dirPathFiles = getProperty(dirPath, 'files');
    const parentFilename = getFilename(dirPath);
    const filename = `${parentFilename}/${name}`;
    
    const typeProperty = createType('directory');
    const filesProperty = createFiles([]);
    const filenameProperty = createFilename(filename);
    
    dirPathFiles.node.value.elements.push(ObjectExpression([
        typeProperty,
        filenameProperty,
        filesProperty,
    ]));
    
    maybeFS.createDirectory(filename);
    
    return dirPathFiles
        .get('value.elements')
        .at(-1);
};

module.exports.readFileContent = (filePath) => {
    const [hasContent, content] = getFileContent(filePath);
    
    if (hasContent)
        return content;
    
    const filename = getFilename(filePath);
    const fileContent = maybeFS.readFileContent(filename);
    
    filePath.node.properties.push(ObjectProperty(StringLiteral('content'), StringLiteral(fileContent)));
    
    return fileContent;
};

module.exports.writeFileContent = (filePath, content) => {
    const filename = getFilename(filePath);
    
    maybeFS.writeFileContent(filename, content);
    
    filePath.node.properties.push(ObjectProperty(StringLiteral('content'), StringLiteral(content)));
};

module.exports.init = maybeFS.init;
module.exports.deinit = maybeFS.deinit;
