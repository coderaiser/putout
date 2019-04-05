'use strict';

const classToFunction = require('./class-to-function');
const {traverseClass} = require('../common');

module.exports.report = ({name}) => {
    return `class ${name} should be a function`;
};

module.exports.fix = ({chunk}) => {
    classToFunction(chunk);
};

module.exports.find = (ast, {push}) => {
    traverseClass(ast, {
        Identifier(chunk) {
            const {name} = chunk.node;
            const {parentPath} = chunk;
            
            if (!parentPath.isClassDeclaration())
                return;
            
            push({
                chunk: parentPath,
                name,
            });
            
            chunk.stop();
        },
    });
};

