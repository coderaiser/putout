'use strict';

const traverse = require('@babel/traverse').default;

// should be removed when resolved:
//
// https://github.com/benjamn/recast/pull/561

module.exports.saveExportDefaultDeclarationLoc = (ast) => {
    traverse(ast, {
        ExportDefaultDeclaration(path) {
            const {declaration} = path.node;
            declaration.__putoutLoc = declaration.loc
        }
    });
    
    return ast;
}

module.exports.restoreExportDefaultDeclarationLoc = (ast) => {
    traverse(ast, {
        ExportDefaultDeclaration(path) {
            const {declaration} = path.node;
            declaration.loc = declaration.__putoutLoc;
            delete declaration.__putoutLoc;
        }
    });
    
    return ast;
}

