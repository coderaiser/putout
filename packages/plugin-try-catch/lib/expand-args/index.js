import {operator} from 'putout';

const {
    remove,
    getBindingPath,
    extract,
} = operator;

export const report = () => `Expand 'tryCatch()' arguments`;

export const match = () => ({
    'tryCatch(__args)': ({__args}, path) => {
        const [fn] = __args;
        const {name} = fn;
        const bindingPath = getBindingPath(path, name);
        
        if (!bindingPath)
            return false;
        
        const initPath = bindingPath.get('init');
        
        if (!initPath.isFunction())
            return false;
        
        const bodyPath = initPath.get('body');
        
        if (!bodyPath.isCallExpression())
            return false;
        
        const calleePath = bodyPath.get('callee');
        const calleeName = extract(calleePath);
        
        return getBindingPath(path, calleeName);
    },
});

export const replace = () => ({
    'tryCatch(__args)': ({__args}, path) => {
        const [fn] = __args;
        const {name} = fn;
        
        const fnPath = getBindingPath(path, name);
        const {node} = fnPath.get('init.body');
        
        path.node.arguments = [node.callee, ...node.arguments];
        
        remove(fnPath);
        
        return path;
    },
});
