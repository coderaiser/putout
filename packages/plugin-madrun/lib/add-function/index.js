'use strict';

const {
    isLiteral,
    isObjectExpression,
    arrowFunctionExpression,
} = require('putout').types;

module.exports.report = ({name}) => `function should be used instead of string in script "${name}`;

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        AssignmentExpression(chunk) {
            const {right} = chunk;
            
            if (!isModuleExports(chunk))
                return;
            
            if (!isObjectExpression(right))
                return;
            
            const {properties} = right;
            
            for (const prop of properties) {
                if (isLiteral(prop.value)) {
                    push({
                        name: prop.key.value,
                        chunk: prop.value,
                    });
                }
            }
        },
    });
};

module.exports.fix = ({chunk}) => {
    chunk.replaceWith(arrowFunctionExpression([], chunk));
};

function isModuleExports(chunk) {
    const {object, property} = chunk.left;
    
    const isModule = object.isIdentifier({
        name: 'module',
    });
    
    const isExports = property.isIdentifier({
        name: 'exports',
    });
    
    return isModule && isExports;
}

