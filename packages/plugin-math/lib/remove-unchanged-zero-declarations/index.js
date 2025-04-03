import {operator, types} from 'putout';

const {
    isNumericLiteral,
    isExportNamedDeclaration,
    isBinaryExpression,
} = types;

const {remove} = operator;

export const report = () => 'Avoid unchanged zero declarations';
export const fix = ({path, referencePaths}) => {
    for (const ref of referencePaths) {
        remove(ref);
    }
    
    remove(path);
};

export const traverse = ({push}) => ({
    VariableDeclarator(path) {
        const {init, id} = path.node;
        
        if (!isNumericLiteral(init))
            return;
        
        if (init.value)
            return;
        
        if (isExportNamedDeclaration(path.parentPath.parentPath))
            return;
        
        const {name} = id;
        const binding = path.scope.bindings[name];
        
        const {
            constantViolations,
            referencePaths,
        } = binding;
        
        if (constantViolations.length)
            return;
        
        if (!referencePaths.length)
            return;
        
        for (const {parent} of referencePaths) {
            if (!isBinaryExpression(parent))
                return;
            
            const {operator} = parent;
            
            if (!/^[+-]$/.test(operator))
                return;
        }
        
        push({
            path,
            referencePaths,
        });
    },
});
