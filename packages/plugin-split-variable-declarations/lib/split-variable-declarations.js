'use strict';

const {
    types,
    operator,
} = require('putout');

const {
    isForStatement,
    variableDeclaration,
} = types;

const {replaceWithMultiple} = operator;

module.exports.report = () => 'Variables should be declared separately';

module.exports.fix = (path) => {
    const {node} = path;
    const varNodes = getVarNodes(node);
    
    replaceWithMultiple(path, varNodes);
};

module.exports.traverse = ({push}) => {
    return {
        VariableDeclaration(path) {
            const {
                node,
                parent,
                parentPath,
            } = path;
            const {declarations} = node;
            
            if (parentPath.isExportDeclaration())
                return;
            
            if (declarations.length === 1)
                return;
            
            const init = node;
            
            if (isForStatement(parent, {init}))
                return;
            
            push(path);
        },
    };
};

function getVarNodes(node) {
    const {
        kind,
        declarations,
    } = node;
    
    const result = [];
    
    for (const declaration of declarations) {
        const declarations = [
            declaration,
        ];
        
        result.push(variableDeclaration(
            kind,
            declarations,
        ));
    }
    
    return result;
}

