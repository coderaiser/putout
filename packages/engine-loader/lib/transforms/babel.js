'use strict';

const {
    createConfigItem,
    transformFromAstSync,
} = require('@babel/core');

module.exports = (ast, code, name) => {
    transformFromAstSync(ast, code, {
        cloneInputAst: false,
        plugins: [
            // globally installed modules support
            createConfigItem(require(name)),
        ],
    });
    
    return ast;
};

