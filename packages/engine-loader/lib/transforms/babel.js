'use strict';

const {
    createConfigItemSync,
    transformFromAstSync,
} = require('@babel/core');

const isString = (a) => typeof a === 'string';

module.exports = (ast, code, name) => {
    const plugin = !isString(name) ? name : require(name);
    // globally installed modules support
    const configItem = createConfigItemSync(plugin);
    
    transformFromAstSync(ast, code, {
        cloneInputAst: false,
        plugins: [
            configItem,
        ],
    });
    
    return ast;
};
