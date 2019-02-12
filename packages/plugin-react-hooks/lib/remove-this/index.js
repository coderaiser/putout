'use strict';

const {
    findClass,
} = require('../common');

module.exports.report = ({name}) => `should be used "${name}" instead of "this.${name}"`;

module.exports.fix = ({path}) => {
    path.replaceWith(path.get('property'));
};

module.exports.find = (ast, {push, traverse}) => {
    findClass(traverse, ast, {
        ThisExpression(path) {
            const {parentPath} = path;
            const propertyPath = parentPath.get('property');
            
            if (!propertyPath.isIdentifier())
                return;
            
            const {name} = propertyPath.node;
            push({
                name,
                path: parentPath,
            });
        },
    });
};

