'use strict';

const {transformFromAstSync} = require('@babel/core');

// transformFromAstSync makes a deep copy of AST in a bad for recast way
// (recast makes broken source code from this AST-copy, because keeps source information
// in object prototypes).
//
// Anyways if we just could use a "clonseInputAst" flag code would look like this:
//
// const {ast} = babel.transformFromAstSync(parsedAst, sourceCode, {
//     ast: true,
//     cloneInputAst: true,

// });

// Issue https://github.com/babel/babel/issues/10231
// PR https://github.com/babel/babel/pull/10241
//
// https://babeljs.io/docs/en/next/babel-core.html#transformfromastsync
module.exports = (ast, code, name) => {
    transformFromAstSync(ast, code, {
        ast: true,
        code: false,
        // remove setAST plugin, when deepCopy flag will be supported
        // deepCopy: false,
        plugins: [
            name,
            [setAst, {
                ast,
            }],
        ],
    });
    
    return ast;
};

function setAst(babel, {ast}) {
    return {
        visitor: {
            Program(path) {
                path.replaceWith(ast.program);
            },
        },
    };
}

