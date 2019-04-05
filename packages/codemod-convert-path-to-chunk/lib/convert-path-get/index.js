'use strict';

const {
    isMemberExpression,
    Identifier,
} = require('putout').types;

module.exports.report = () => {
    return `"path.property should be used instead of "path.get('property')"`;
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        CallExpression(chunk) {
            if (!isMemberExpression(chunk.callee))
                return;
            
            const {property} = chunk.callee;
            
            if (property.name !== 'get')
                return;
            
            push(chunk);
        },
    });
};

module.exports.fix = (path) => {
    const id = Identifier(path.node.arguments[0].value);
    path.replaceWith(path.node.callee);
    path.property.replaceWith(id);
};

