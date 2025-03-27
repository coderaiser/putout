import {types} from 'putout';

const {
    isIdentifier,
    awaitExpression,
} = types;

export const report = () => `Call async functions using 'await'`;

export const match = () => ({
    '__a(__args)': ({__a}, path) => {
        if (!isIdentifier(__a))
            return false;
        
        if (!path.getFunctionParent())
            return false;
        
        if (path.parentPath.isArrayExpression())
            return false;
        
        if (path.parentPath.isMemberExpression())
            return false;
        
        if (path.find(isInsideUseEffect))
            return false;
        
        const {name} = __a;
        const binding = path.scope.getAllBindings()[name];
        
        if (!binding)
            return false;
        
        if (!binding.path.isFunction())
            return false;
        
        if (!binding.path.node.async)
            return false;
        
        return !path.parentPath.isAwaitExpression();
    },
});

export const replace = () => ({
    '__a(__args)': (vars, path) => {
        const fnPath = path.getFunctionParent();
        
        fnPath.node.async = true;
        
        return awaitExpression(path.node);
    },
});

function isInsideUseEffect(path) {
    if (!path.isCallExpression())
        return false;
    
    const callee = path.get('callee');
    
    return callee.isIdentifier({
        name: 'useEffect',
    });
}
