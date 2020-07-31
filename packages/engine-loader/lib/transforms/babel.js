'use strict';

const {transformFromAstSync} = require('@babel/core');

module.exports = (ast, code, name) => {
    transformFromAstSync(ast, code, {
        cloneInputAst: false,
        plugins: [
            name,
        ],
    });
    
    return ast;
};

