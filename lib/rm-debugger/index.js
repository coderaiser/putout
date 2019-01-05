'use strict';

const traverse = require('@babel/traverse').default;

module.exports = (ast) => {
    const places = [];
    
    traverse(ast, {
        DebuggerStatement(path) {
            places.push(path.node);
            path.remove();
        }
    });
    
    return places;
};

module.exports.message = 'Unexpected "debugger" statement';

