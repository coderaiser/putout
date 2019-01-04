'use strict';

const traverse = require('@babel/traverse').default;

module.exports = (ast) => {
    const places = [];
    
    traverse(ast, {
        DebuggerStatement(path) {
            const {loc} = path.node;
            
            places.push({
                loc: loc.start,
            });
            
            path.remove();
        }
    });
    
    return places;
};

module.exports.message = 'Unexpected "debugger" statement';

