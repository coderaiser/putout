'use strict';

const traverse = require('@babel/traverse').default;

const {
    isForStatement,
    variableDeclaration,
    variableDeclarator
} = require('@babel/types');

module.exports.message = 'variables should be declard separately';

module.exports.find = (ast) => {
    const places = [];
    
    traverse(ast, {
        VariableDeclaration(path) {
            const {node, parent} = path;
            const {declarations} = node;
            
            if (declarations.length === 1)
                return;
            
            const init = node;
            if (isForStatement(parent, {init}))
                return;
            
            places.push(path);
        }
    });
    
    return places;
};

module.exports.fix = (path) => {
    const {node, parent} = path;
    
    const {body} = parent;
    const index = body.indexOf(node);
    
    const varNodes = getVarNodes(node);
    
    body.splice(index, 1, ...varNodes);
};

function getVarNodes(node) {
    const {declarations} = node;
    const result = [];
    
    for (const declaration of declarations) {
        result.push(
            variableDeclaration(node.kind, [
                variableDeclarator(declaration.id, declaration.init)
            ]
            ));
    }
    
    return result;
}

