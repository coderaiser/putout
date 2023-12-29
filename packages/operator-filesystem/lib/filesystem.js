'use strict';

const {join} = require('node:path');
const tryCatch = require('try-catch');
const {types} = require('@putout/babel');

const {
    setLiteralValue,
    getProperty,
    traverseProperties,
} = require('@putout/operate');

const maybeFS = require('./maybe-fs');
const isString = (a) => typeof a === 'string';
const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const toBase64 = (content) => {
    const [e, decoded] = tryCatch(btoa, content);
    
    if (!e)
        return encodeURI(decoded);
    
    return content;
};

const fromBase64 = (content) => {
    const [e, decoded] = tryCatch(atob, content);
    
    if (!e)
        return decodeURI(decoded);
    
    return content;
};

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

module.exports.findFile = findFile;

function findFile(node, name) {
    checkName(name);
    
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
}

function checkName(name) {
    if (!isString(name) && !isArray(name))
        throw Error(`☝️ Looks like you forget to pass the 'name' of a file to 'findFile(filePath: Path|FilePath, name: string | string[]): FilePath'`);
}

function getFilenamePath(filePath) {
    const filenamePath = getProperty(filePath, 'filename');
    return filenamePath.get('value');
}

function getFilename(filePath) {
    const {value} = getFilenamePath(filePath).node;
    return value;
}

module.exports.getFileType = getFileType;

function getFileType(filePath) {
    const typePath = getProperty(filePath, 'type');
    return typePath.node.value.value;
}

module.exports.getFileContent = getFileContent;

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

module.exports.moveFile = (filePath, dirPath) => {
    if (filePath === dirPath)
        return;
    
    const dirname = getFilename(dirPath);
    const filename = getFilename(filePath);
    const dirPathFiles = getProperty(dirPath, 'files');
    const filenamePath = getProperty(filePath, 'filename');
    
    const basename = filename
        .split('/')
        .pop();
    
    const newFilename = join(dirname, basename);
    
    maybeRemoveFile(dirPath, newFilename);
    
    setLiteralValue(filenamePath.get('value'), newFilename);
    dirPathFiles.node.value.elements.push(filePath.node);
    
    filePath.remove();
    maybeFS.renameFile(filename, newFilename);
};

module.exports.copyFile = (filePath, dirPath) => {
    const dirname = getFilename(dirPath);
    const filename = getFilename(filePath);
    
    const basename = filename
        .split('/')
        .pop();
    
    const newFilename = join(dirname, basename);
    const [hasContent, content] = getFileContent(filePath);
    
    const copiedFile = ObjectExpression([
        createTypeProperty('file'),
        createFilenameProperty(newFilename),
        hasContent && createContentProperty(content),
    ].filter(Boolean));
    
    maybeRemoveFile(dirPath, newFilename);
    
    const dirPathFiles = getFiles(dirPath);
    dirPathFiles.node.value.elements.push(copiedFile);
    
    maybeFS.copyFile(filename, newFilename);
};

function maybeRemoveFile(dirPath, filename) {
    const type = getFileType(dirPath);
    
    if (type !== 'directory') {
        const filename = getFilename(dirPath);
        throw Error(`☝️ Looks like '${filename}' is not a directory, but: '${type}'. Rename to '${filename}/'`);
    }
    
    const dirPathFiles = getProperty(dirPath, 'files');
    const [fileToOverwrite] = findFile(dirPathFiles, filename);
    
    if (!fileToOverwrite)
        return;
    
    fileToOverwrite.remove();
}

const createTypeProperty = (type) => ObjectProperty(StringLiteral('type'), StringLiteral(type));

module.exports.createTypeProperty = createTypeProperty;

const createFilesProperty = (files) => ObjectProperty(StringLiteral('files'), ArrayExpression(files));

module.exports.createFilesProperty = createFilesProperty;

const createFilenameProperty = (filename) => ObjectProperty(StringLiteral('filename'), StringLiteral(filename));

module.exports.createFilenameProperty = createFilenameProperty;

const createContentProperty = (content) => ObjectProperty(StringLiteral('content'), StringLiteral(content));

module.exports.createContentProperty = createContentProperty;

module.exports.createFile = (dirPath, name, content) => {
    maybeRemoveFile(dirPath, name);
    
    const dirPathFiles = getFiles(dirPath);
    const parentFilename = getFilename(dirPath);
    const filename = join(parentFilename, name);
    
    const typeProperty = createTypeProperty('file');
    const filenameProperty = createFilenameProperty(filename);
    
    const properties = [
        typeProperty,
        filenameProperty,
        content && createContentProperty(content),
    ].filter(Boolean);
    
    dirPathFiles.node.value.elements.push(ObjectExpression(properties));
    
    const filePath = dirPathFiles
        .get('value.elements')
        .at(-1);
    
    if (isString(content))
        writeFileContent(filePath, content);
    
    return filePath;
};

function getFiles(dirPath) {
    return getProperty(dirPath, 'files');
}

module.exports.createDirectory = (dirPath, name) => {
    const dirPathFiles = getFiles(dirPath);
    const parentFilename = getFilename(dirPath);
    const filename = join(parentFilename, name);
    
    const typeProperty = createTypeProperty('directory');
    const filesProperty = createFilesProperty([]);
    const filenameProperty = createFilenameProperty(filename);
    
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

module.exports.readFileOptions = (filePath, options) => {
    if (filePath.__putout_file_options)
        return filePath.__putout_file_options;
    
    const filename = getFilename(filePath);
    
    filePath.__putout_file_options = maybeFS.readFileOptions(filename, options);
    
    return filePath.__putout_file_options;
};

module.exports.readFileContent = (filePath) => {
    const fileType = getFileType(filePath);
    
    if (fileType === 'directory')
        return '';
    
    const [hasContent, content] = getFileContent(filePath);
    
    if (hasContent)
        return fromBase64(content);
    
    const filename = getFilename(filePath);
    const fileContent = maybeFS.readFileContent(filename);
    const property = createContentProperty(fileContent);
    
    filePath.node.properties.push(property);
    
    return fileContent;
};

module.exports.writeFileContent = writeFileContent;

function writeFileContent(filePath, content) {
    const fileType = getFileType(filePath);
    
    if (fileType === 'directory')
        return;
    
    const filename = getFilename(filePath);
    
    maybeFS.writeFileContent(filename, content);
    
    const contentPath = getProperty(filePath, 'content');
    
    if (contentPath) {
        setLiteralValue(contentPath.node.value, toBase64(content));
        return;
    }
    
    const property = createContentProperty(toBase64(content));
    filePath.node.properties.push(property);
}

module.exports.init = maybeFS.init;
module.exports.deinit = maybeFS.deinit;

module.exports.pause = maybeFS.pause;
module.exports.start = maybeFS.start;
