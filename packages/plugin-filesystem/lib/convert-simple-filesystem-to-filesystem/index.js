'use strict';

const {types, operator} = require('putout');

const {dirname} = require('path');
const {
    replaceWith,
    moveFile,
    findFile,
    __filesystem_name,
} = operator;
const {
    ObjectExpression,
    isArrayExpression,
    ArrayExpression,
    StringLiteral,
    ObjectProperty,
} = types;

module.exports.report = () => `Use object instead of array in __filesystem`;

const isDirectory = (a) => a.endsWith('/');
const getType = (a) => {
    const type = isDirectory(a) ? 'directory' : 'file';
    
    return ObjectProperty(StringLiteral('type'), StringLiteral(type));
};

const getFilename = (filename) => {
    return ObjectProperty(StringLiteral('filename'), StringLiteral(filename));
};

const getFiles = (a) => {
    if (isDirectory(a))
        return ObjectProperty(StringLiteral('files'), ArrayExpression([]));
    
    return null;
};

const getContent = (a) => {
    return ObjectProperty(StringLiteral('content'), StringLiteral(a));
};

module.exports.fix = (path) => {
    const filenames = [];
    
    for (const element of path.get('elements')) {
        if (isArrayExpression(element)) {
            const [nodeValue, nodeContent] = element.node.elements;
            const {value} = nodeValue;
            const content = nodeContent.value;
            
            filenames.push(value);
            
            replaceWith(element, ObjectExpression([
                getType(value),
                getFilename(value),
                getContent(content),
            ]));
            continue;
        }
        
        const {value} = element.node;
        filenames.push(noTrailingSlash(value));
        
        replaceWith(element, ObjectExpression([
            getType(value),
            getFilename(noTrailingSlash(value)),
            getFiles(value),
        ].filter(Boolean)));
    }
    
    buildTree(path, filenames);
};

module.exports.traverse = ({push}) => ({
    CallExpression(path) {
        const {name} = path.get('callee').node;
        
        if (name !== __filesystem_name)
            return;
        
        const argPath = path.get('arguments.0');
        
        if (!argPath.isArrayExpression())
            return;
        
        push(argPath);
    },
});

const noTrailingSlash = (a) => {
    if (a === '/')
        return a;
    
    return a.endsWith('/') ? a.slice(0, -1) : a;
};

function buildTree(ast, filenames) {
    const [rootName] = filenames;
    
    for (const filename of filenames) {
        const [filePath] = findFile(ast, filename);
        const dir = dirname(filename);
        const [dirPath] = findFile(ast, dir);
        
        moveFile(filePath, dirPath);
    }
    
    const [rootPath] = findFile(ast, rootName);
    
    replaceWith(rootPath.parentPath, rootPath);
}
