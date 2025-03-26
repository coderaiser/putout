import {types} from 'putout';

const {awaitExpression} = types;

export const report = () => `Use await with 'tryToCatch'`;

export const match = () => ({
    'tryToCatch(__args)': (vars, path) => {
        if (path.parentPath.isAwaitExpression())
            return false;
        
        if (path.parentPath.isVariableDeclarator())
            return true;
        
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    'await tryCatch(__args)': 'await tryToCatch(__args)',
    'tryToCatch(__args)': (vars, path) => {
        const fn = path.getFunctionParent();
        
        if (fn)
            fn.node.async = true;
        
        return awaitExpression(path.node);
    },
});
