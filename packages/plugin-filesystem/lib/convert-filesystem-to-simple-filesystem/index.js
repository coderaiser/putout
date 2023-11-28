'use strict';

const {operator, types} = require('putout');

const {
    findFile,
    replaceWith,
    getProperty,
    getFilename,
} = operator;

const {
    StringLiteral,
    ArrayExpression,
} = types;

const {isArray} = Array;

module.exports.report = () => `Use 'if condition' instead of 'ternary expression'`;

module.exports.fix = (root, {files}) => {
    const names = [];
    
    for (const file of files) {
        const filename = getFilename(file);
        const contentPath = getProperty(file, 'content');
        const content = contentPath?.node?.value?.value;
        
        if (content)
            names.push([filename, content]);
        
        names.push(filename);
    }
    
    const list = [];
    
    for (const name of names) {
        if (isArray(name)) {
            list.push(ArrayExpression([
                StringLiteral(name[0]),
                StringLiteral(name[1]),
            ]));
            continue;
        }
        
        list.push(StringLiteral(name));
    }
    
    replaceWith(root, ArrayExpression(list));
};

module.exports.scan = (root, {push}) => {
    const files = findFile(root, '*');
    
    push(root, {
        files,
    });
};
