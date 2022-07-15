'use strict';

const {replaceWith} = require('putout').operator;

const {traverseClass} = require('../common');

module.exports.report = ({name}) => `should be used "${name}" instead of "this.${name}"`;

module.exports.fix = ({path}) => {
    replaceWith(path, path.get('property'));
};

module.exports.find = (ast, {push, traverse}) => {
    traverseClass(traverse, ast, {
        ThisExpression({parentPath}) {
            const propertyPath = parentPath.get('property');
            
            if (!parentPath.isMemberExpression())
                return;
            
            const {name} = propertyPath.node;
            
            push({
                name,
                path: parentPath,
            });
        },
    });
};

