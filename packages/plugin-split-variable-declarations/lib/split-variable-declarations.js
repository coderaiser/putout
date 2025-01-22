'use strict';

const {types, operator} = require('putout');

const {
    isForStatement,
    variableDeclaration,
} = types;

const {
    replaceWithMultiple,
    isKeyword,
} = operator;

module.exports.report = () => 'Variables should be declared separately';

module.exports.fix = (path) => {
    const {node} = path;
    const varNodes = getVarNodes(node);
    
    replaceWithMultiple(path, varNodes);
};

module.exports.traverse = ({push}) => ({
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
        
        for (const declaration of declarations) {
            const {name} = declaration.id;
            
            if (isKeyword(name))
                return;
        }
        
        const init = node;
        
        if (isForStatement(parent, {init}))
            return;
        
        push(path);
    },
});

function getVarNodes({kind, declarations}) {
    const result = [];
    
    for (const declaration of declarations) {
        const declarations = [declaration];
        
        result.push(variableDeclaration(
            kind,
            declarations,
        ));
    }
    
    return result;
}
