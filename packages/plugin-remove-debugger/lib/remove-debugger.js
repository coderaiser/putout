'use strict';

const traverse = require('@babel/traverse').default;

module.exports.getMessage = () => 'Unexpected "debugger" statement';

module.exports.find = (ast) => {
    const places = [];
    
    traverse(ast, {
        DebuggerStatement(path) {
            places.push(path);
        }
    });
    
    return places;
};

module.exports.fix = (path) => {
    path.remove();
};

