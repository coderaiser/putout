'use strict';

const {traverseClass} = require('../common');

module.exports.report = ({name}) => `should be used "${name}" instead of "this.${name}"`;

module.exports.fix = ({chunk}) => {
    chunk.replaceWith(chunk.property);
};

module.exports.find = (ast, {push}) => {
    traverseClass(ast, {
        ThisExpression(chunk) {
            const {parentPath} = chunk;
            const propertyPath = parentPath.property;
            
            const {name} = propertyPath.node;
            push({
                name,
                chunk: parentPath,
            });
        },
    });
};

