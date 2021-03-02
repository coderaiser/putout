'use strict';

const {File} = require('@babel/core');
const traverse = require('@babel/traverse').default;
const print = require('./print');

const fixTraverseHubError = ({code, ast}) => new File({filename: '__putout.js'}, {code, ast});

module.exports = (ast, visitors, scope) => {
    scope = scope || fixTraverseHubError({
        ast,
        code: print(ast),
    });
    
    traverse(ast, visitors, scope);
};
