'use strict';

const tryCatch = require('try-catch');
const {types} = require('putout');

const {
    setLiteralValue,
    getProperty,
    traverseProperties,
} = require('@putout/operate');

const maybeFS = require('./maybe-fs');
const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

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
    const names = maybeArray(name);
    
    for (const filenamePath of traverseProperties(node, 'filename')) {
        const {value} = filenamePath.node.value;
        
        for (const name of names) {
            if (value === name || getRegExp(name).test(value))
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
    
    const newName = name
        .split('/')
        .pop();
    
    const newFilename = oldName.replace(baseName, newName);
    
    setLiteralValue(valuePath, newFilename);
    maybeFS.renameFile(oldName, newFilename);
};

module.exports.removeFile = (filePath) => {
    const filename = getFilename(filePath);
    
    filePath.remove();
    maybeFS.removeFile(filename);
};

function getFile(dirPathFiles, name) {
    for (const file of dirPathFiles.get('value.elements')) {
        if (name === getFilename(file))
            return [true, file];
    }
    
    return [false];
}

module.exports.moveFile = (filePath, dirPath) => {
    const dirname = getFilename(dirPath);
    const filename = getFilename(filePath);
    const dirPathFiles = getProperty(dirPath, 'files');
    const filenamePath = getProperty(filePath, 'filename');
    
    const basename = filename
        .split('/')
        .pop();
    
    const newname = `${dirname}/${basename}`;
    const [is] = getFile(dirPathFiles, newname);
    
    if (!is) {
        setLiteralValue(filenamePath.get('value'), newname);
        dirPathFiles.node.value.elements.push(filePath.node);
        filePath.remove();
    }
    
    maybeFS.renameFile(filename, newname);
};

module.exports.copyFile = (filePath, dirPath) => {
    const dirname = getFilename(dirPath);
    const filename = getFilename(filePath);
    const dirPathFiles = getProperty(dirPath, 'files');
    
    const basename = filename
        .split('/')
        .pop();
    
    const newFilename = `${dirname}/${basename}`;
    
    const copiedFile = ObjectExpression([
        createType('file'),
        createFilename(newFilename),
    ]);
    
    const [is] = getFile(dirPathFiles, newFilename);
    
    if (!is)
        dirPathFiles.node.value.elements.push(copiedFile);
    
    maybeFS.copyFile(filename, newFilename);
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

const createContentProperty = (content) => {
    const contentKey = StringLiteral('content');
    const contentValue = StringLiteral(btoa(content));
    
    return ObjectProperty(contentKey, contentValue);
};

module.exports.readFileContent = (filePath) => {
    const [hasContent, content] = getFileContent(filePath);
    
    if (hasContent) {
        const [, decoded] = tryCatch(atob, content);
        return decoded || content;
    }
    
    const filename = getFilename(filePath);
    const fileContent = maybeFS.readFileContent(filename);
    const property = createContentProperty(fileContent);
    
    filePath.node.properties.push(property);
    
    return fileContent;
};

module.exports.writeFileContent = (filePath, content) => {
    const filename = getFilename(filePath);
    
    maybeFS.writeFileContent(filename, content);
    
    const contentPath = getProperty(filePath, 'content');
    
    if (contentPath) {
        setLiteralValue(contentPath.node.value, btoa(content));
        return;
    }
    
    const property = createContentProperty(content);
    filePath.node.properties.push(property);
};

module.exports.init = maybeFS.init;
module.exports.deinit = maybeFS.deinit;
