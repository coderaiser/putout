'use strict';

const {types} = require('putout');

const classToFunction = require('./class-to-function');
const {traverseClass} = require('../common');

const {
    isIdentifier,
    isClassMethod,
} = types;

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
            
            if (!hasLifeCycle(parentPath))
                push({
                    path: parentPath,
                    name,
                });
            
            path.stop();
        },
    });
};

function hasLifeCycle(path) {
    const {body} = path.node.body;
    
    for (const current of body) {
        if (!isClassMethod(current))
            continue;
        
        if (isIdentifier(current.key, {name: 'componentWillUnmount'}))
            return true;
    }
    
    return false;
}

