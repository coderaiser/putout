'use strict';

const {
    createConfigItem,
    transformFromAstSync,
} = require('@babel/core');

const isString = (a) => typeof a === 'string';

module.exports = (ast, code, name) => {
    const plugin = !isString(name) ? name : require(name);
    
    transformFromAstSync(ast, code, {
        cloneInputAst: false,
        plugins: [
            // globally installed modules support
            createConfigItem(plugin),
        ],
    });
    
    return ast;
};
