'use strict';

const traverse = require('@babel/traverse').default;

module.exports = (ast) => {
    traverse(ast, {
        Literal(path) {
            const {node} = path;
            const {extra} = node;
            
            if (!extra)
                return;
            
            node.raw = extra.raw;
        },
    });
    
    return ast;
};

