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
        CallExpression(path) {
            if (!isMemberExpression(path.node.callee))
                return;
            
            const {object, property} = path.node.callee;
            
            if (object.name !== 'path' && property !== 'get')
                return;
            
            push(path);
        },
    });
};

module.exports.fix = (path) => {
    const id = Identifier(path.node.arguments[0].value);
    path.replaceWith(path.node.callee);
    path.get('property').replaceWith(id);
};

