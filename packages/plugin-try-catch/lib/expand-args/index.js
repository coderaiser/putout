import {operator, types} from 'putout';

const {traverseFast} = types;

const {
    remove,
    getBindingPath,
    extract,
} = operator;

// moved nodes keep old location, and 'declare-before-reference'
// thinks they are referenced before declaration: endless loop
const removeLoc = (node) => {
    traverseFast(node, (current) => {
        delete current.loc;
        delete current.start;
        delete current.end;
    });
    
    return node;
};

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
        
        path.node.arguments = [node.callee, ...node.arguments].map(removeLoc);
        
        remove(fnPath);
        
        return path;
    },
});
