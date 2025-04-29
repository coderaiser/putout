import {types, operator} from 'putout';

const {
    isForStatement,
    variableDeclaration,
} = types;

const {
    replaceWithMultiple,
    isKeyword,
} = operator;

export const report = () => 'Variables should be declared separately';

export const fix = (path) => {
    const {node} = path;
    const varNodes = getVarNodes(node);
    
    replaceWithMultiple(path, varNodes);
};

export const traverse = ({push}) => ({
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
