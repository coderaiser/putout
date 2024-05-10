'use strict';

const {types} = require('@putout/babel');
const {basename, dirname} = require('node:path');
const {
    createDirectory,
    getFileType,
    getFilename,
    findFile,
} = require('@putout/operator-filesystem');

const {__filesystem_name} = require('@putout/operator-json');
const {replaceWith, getProperty} = require('@putout/operate');

const {
    ObjectExpression,
    isArrayExpression,
    ArrayExpression,
    StringLiteral,
    ObjectProperty,
} = types;

module.exports.report = () => `Convert Simple Filesystem to Filesystem`;

const isDirectory = (a) => a.endsWith('/');
const getType = (a) => {
    const type = isDirectory(a) ? 'directory' : 'file';
    
    return ObjectProperty(StringLiteral('type'), StringLiteral(type));
};

const createFilename = (filename) => {
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
    const array = ArrayExpression([]);
    
    for (const element of path.get('elements')) {
        if (isArrayExpression(element)) {
            const [nodeValue, nodeContent] = element.node.elements;
            const {value} = nodeValue;
            const content = nodeContent.value;
            
            array.elements.push(ObjectExpression([
                getType(value),
                createFilename(value),
                getContent(content),
            ]));
            continue;
        }
        
        const {value} = element.node;
        
        array.elements.push(ObjectExpression([
            getType(value),
            createFilename(noTrailingSlash(value)),
            getFiles(value),
        ].filter(Boolean)));
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
