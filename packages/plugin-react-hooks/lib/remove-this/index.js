'use strict';

const {traverseClass} = require('../common');

module.exports.report = ({name}) => `should be used "${name}" instead of "this.${name}"`;

module.exports.fix = ({path}) => {
    path.replaceWith(path.get('property'));
};

module.exports.find = (ast, {push}) => {
    traverseClass(ast, {
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

