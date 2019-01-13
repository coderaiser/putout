'use strict';

const {
    isForStatement,
    variableDeclaration,
    variableDeclarator,
} = require('@babel/types');

module.exports.report = () => 'variables should be declared separately';

module.exports.fix = (path) => {
    const varNodes = getVarNodes(path.node);
    path.replaceWithMultiple(varNodes);
};

module.exports.find = (ast, {traverse}) => {
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

function getVarNodes(node) {
    const {declarations} = node;
    const result = [];
    
    for (const declaration of declarations) {
        result.push(
            variableDeclaration(node.kind, [
                variableDeclarator(declaration.id, declaration.init)
            ])
        );
    }
    
    return result;
}

