import {types, operator} from 'putout';

const {createTypeChecker} = operator;

const {
    isIdentifier,
    awaitExpression,
} = types;

const isNotAwaited = createTypeChecker([
    ['-: parentPath -> ArrayExpression'],
    ['-: parentPath -> MemberExpression'],
    ['-: parentPath -> AwaitExpression'],
    ['+: -> CallExpression'],
]);

const isAsyncFunction = createTypeChecker([
    ['+: path.node.async', Boolean],
]);

export const report = () => `Call async functions using 'await'`;

export const match = () => ({
    '__a(__args)': ({__a}, path) => {
        if (!isIdentifier(__a))
            return false;
        
        if (!path.getFunctionParent())
            return false;
        
        if (!isNotAwaited(path))
            return false;
        
        if (path.find(isInsideUseEffect))
            return false;
        
        const {name} = __a;
        const binding = path.scope.getAllBindings()[name];
        
        if (!binding)
            return false;
        
        return isAsyncFunction(binding);
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
