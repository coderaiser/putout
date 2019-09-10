'use strict';

const classToFunction = require('./class-to-function');
const {traverseClass} = require('../common');

module.exports.report = ({name}) => {
    return `class ${name} should be a function`;
};

module.exports.fix = ({path}) => {
    classToFunction(path);
};

module.exports.find = (ast, {push, traverse}) => {
    traverseClass(traverse, ast, {
        Identifier(path) {
            const {name} = path.node;
            const {parentPath} = path;
            
            if (!parentPath.isClassDeclaration())
                return;
            
            push({
                path: parentPath,
                name,
            });
            
            path.stop();
        },
    });
};

