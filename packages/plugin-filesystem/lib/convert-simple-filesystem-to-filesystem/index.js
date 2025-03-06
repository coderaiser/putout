'use strict';

const {basename, dirname} = require('node:path');
const {types} = require('@putout/babel');
const {
    createDirectory,
    getFileType,
    getFilename,
    findFile,
} = require('@putout/operator-filesystem');

const {__filesystem_name} = require('@putout/operator-json');
const {replaceWith, getProperty} = require('@putout/operate');

const {
    objectExpression,
    arrayExpression,
    stringLiteral,
    isArrayExpression,
    isStringLiteral,
    isTemplateLiteral,
    objectProperty,
} = types;

module.exports.report = () => `Convert Simple Filesystem to Filesystem`;

const isDirectory = (a) => a.endsWith('/');
const getType = (a) => {
    const type = isDirectory(a) ? 'directory' : 'file';
    
    return objectProperty(stringLiteral('type'), stringLiteral(type));
};

const createFilename = (filename) => {
    return objectProperty(stringLiteral('filename'), stringLiteral(filename));
};

const getFiles = (a) => {
    if (isDirectory(a))
        return objectProperty(stringLiteral('files'), arrayExpression([]));
    
    return null;
};

const getContent = (a) => {
    return objectProperty(stringLiteral('content'), stringLiteral(a));
};

function parseContent(node, path) {
    if (isStringLiteral(node))
        return node.value;
    
    if (isTemplateLiteral(node))
        return btoa(node.quasis[0].value.raw);
    
    throw Error(`☝️ Looks like wrong content type: '${node.type}' from file: '${path}'`);
}

module.exports.fix = (path) => {
    const array = arrayExpression([]);
    
    for (const element of path.get('elements')) {
        if (isArrayExpression(element)) {
            const [nodeValue, nodeContent] = element.node.elements;
            const {value} = nodeValue;
            
            const content = parseContent(nodeContent, element);
            
            array.elements.push(objectExpression([
                getType(value),
                createFilename(value),
                getContent(content),
            ]));
            continue;
        }
        
        if (isStringLiteral(element)) {
            const {value} = element.node;
            
            array.elements.push(objectExpression([
                getType(value),
                createFilename(noTrailingSlash(value)),
                getFiles(value),
            ].filter(Boolean)));
            continue;
        }
        
        throw Error(`☝️ Looks like file '${element}' has wrong type: '${element.type}' expected: 'string | array'`);
    }
    
    buildTree(path, array);
};

module.exports.traverse = ({push}) => ({
    [`${__filesystem_name}(__array)`]: (path) => {
        const root = path.get('arguments.0');
        push(root);
    },
});

const noTrailingSlash = (a) => {
    if (a === '/')
        return a;
    
    return a.endsWith('/') ? a.slice(0, -1) : a;
};

function buildTree(path, list) {
    const [root, ...files] = findFile(list, '*');
    
    for (const filePath of files) {
        const filename = getFilename(filePath);
        
        check(filename);
        
        const type = getFileType(filePath);
        const dir = dirname(filename);
        const name = basename(filename);
        const [dirPath] = findFile(root, dir);
        
        if (!dirPath || getFileType(dirPath) !== 'directory')
            throw Error(`☝️ Looks like directory '${dir}/' is missing`);
        
        if (type === 'directory') {
            createDirectory(dirPath, name);
            continue;
        }
        
        const filesProperty = getProperty(dirPath, 'files');
        filesProperty.node.value.elements.push(filePath.node);
    }
    
    replaceWith(path, root);
}

function check(filename) {
    if (!filename.includes('/'))
        throw Error(`☝️ Looks like directory path is missing: '${filename}'`);
}
