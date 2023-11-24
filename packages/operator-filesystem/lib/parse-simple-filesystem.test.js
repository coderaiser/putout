'use strict';

const {replaceWith} = require('putout').operator;
const {dirname} = require('path');
const {parse, print} = require('@putout/engine-parser');
const {toJS, fromJS} = require('@putout/operator-json');
const {moveFile, findFile} = require('./filesystem');

const {stringify} = JSON;
const noTrailingSlash = (a) => a.endsWith('/') ? a.slice(0, -1) : a;

const createFile = (filename) => ({
    type: 'file',
    filename,
});

const createDirectory = (filename) => ({
    type: 'directory',
    filename,
    files: [],
});

module.exports.parseSimpleFilesystem = (list) => {
    const files = createFlatFiles(list);
    const js = toJS(stringify(files));
    const ast = parse(js);
    
    const filenames = list.map(noTrailingSlash);
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
    
    return JSON.parse(fromJS(print(ast)), null, 4);
};

function createFlatFiles(list) {
    const result = [];
    
    for (const file of list) {
        if (file.endsWith('/')) {
            result.push(createDirectory(file.slice(0, -1)));
            continue;
        }
        
        result.push(createFile(file));
    }
    
    return result;
}
