'use strict';

const {replaceWith} = require('putout').operator;
const {dirname} = require('node:path');
const {parse, print} = require('@putout/engine-parser');
const {toJS, fromJS} = require('@putout/operator-json');
const {moveFile, findFile} = require('./filesystem');
const {isArray} = Array;
const {stringify} = JSON;

const noTrailingSlash = (a) => {
    if (a === '/')
        return a;
    
    return a.endsWith('/') ? a.slice(0, -1) : a;
};

const createFile = (filename) => ({
    type: 'file',
    filename,
});

const createFileWithContent = (filename, content) => ({
    type: 'file',
    filename,
    content,
});

const createDirectory = (filename) => ({
    type: 'directory',
    filename,
    files: [],
});

const parseFirst = (a) => isArray(a) ? a[0] : a;

module.exports.parseSimpleFilesystem = (list) => {
    const files = createFlatFiles(list);
    const js = toJS(stringify(files));
    const ast = parse(js);
    
    const filenames = list
        .map(parseFirst)
        .map(noTrailingSlash);
    
    const [rootName] = filenames;
    
    for (const filename of filenames) {
        const [filePath] = findFile(ast, filename);
        const dir = dirname(filename);
        const [dirPath] = findFile(ast, dir);
        
        if (!dirPath)
            continue;
        
        moveFile(filePath, dirPath);
    }
    
    const [rootPath] = findFile(ast, rootName);
    
    replaceWith(rootPath.parentPath, rootPath);
    
    return JSON.parse(fromJS(print(ast)));
};

function createFlatFiles(list) {
    const result = [];
    
    for (const file of list) {
        if (isArray(file)) {
            const [filename, content] = file;
            result.push(createFileWithContent(filename, content));
            continue;
        }
        
        if (file.endsWith('/')) {
            result.push(createDirectory(noTrailingSlash(file)));
            continue;
        }
        
        result.push(createFile(file));
    }
    
    return result;
}
