'use strict';

const {transformFromAstSync} = require('@babel/core');

const print = require('../print');
const getPositions = require('./get-positions');

const getMessage = (a) => a
    .replace(/@babel\/plugin-|babel-plugin-/, '')
    .replace(/-/g, ' ');

module.exports = ({fix, ast, babelPlugins}) => {
    const places = [];
    
    if (!babelPlugins)
        return places;
    
    const oldCode = print(ast);
    
    for (const plugin of babelPlugins) {
        transform(ast, '', plugin);
        
        // that's right, transform changes AST
        const newCode = print(ast);
        
        if (!fix && newCode !== oldCode) {
            const positions = getPositions(oldCode, newCode);
            const rule = `babel/${plugin}`;
            const message = getMessage(plugin);
            
            for (const position of positions)
                places.push({
                    rule,
                    message,
                    position,
                });
        }
    }
    
    return places;
};

// transformFromAstSync makes a deep copy of AST in a bad for recast way
// (recast makes broken source code from this AST-copy, because keeps source information
// in object prototypes).
//
// Anyways if we just could use a "deepCopy" flag code would look like this:
//
// const {ast} = babel.transformFromAstSync(parsedAst, sourceCode, {
//     ast: true,
//     deepCopy: false,
// });

// https://github.com/babel/babel/issues/10231
// https://babeljs.io/docs/en/next/babel-core.html#transformfromastsync
function transform(ast, code, name) {
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
}

function setAst(babel, {ast}) {
    return {
        visitor: {
            Program(path) {
                path.replaceWith(ast.program);
            },
        },
    };
}

