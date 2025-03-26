import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Expand 'tryCatch()' arguments`;

export const match = () => ({
    'tryCatch(__args)': ({__args}, path) => {
        const [fn] = __args;
        const {name} = fn;
        const {bindings} = path.scope;
        
        if (!bindings[name])
            return false;
        
        const initPath = bindings[name].path.get('init');
        
        if (!initPath.isFunction())
            return false;
        
        const bodyPath = initPath.get('body');
        
        return bodyPath.isCallExpression();
    },
});

export const replace = () => ({
    'tryCatch(__args)': ({__args}, path) => {
        const [fn] = __args;
        const {name} = fn;
        const {bindings} = path.scope;
        
        const fnPath = bindings[name].path;
        const {node} = fnPath.get('init.body');
        
        if (path.node.arguments.length === 1)
            path.node.arguments = [node.callee, ...node.arguments];
        else
            path.node.arguments[0] = node.callee;
        
        remove(fnPath);
        
        return path;
    },
});
