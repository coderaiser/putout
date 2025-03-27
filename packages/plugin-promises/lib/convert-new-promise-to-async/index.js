import {operator, types} from 'putout';

const {
    returnStatement,
    throwStatement,
} = types;

const {
    replaceWith,
    traverse,
    remove,
    compare,
} = operator;

const isPassedToFn = (path) => {
    const {parentPath} = path;
    return parentPath.get('callee') !== path;
};

export const report = () => `Async functions should be used instead of 'new Promise()'`;

export const match = () => ({
    'return new Promise(__a)': (vars, path) => {
        const {scope} = path.get('argument.arguments.0');
        const {resolve, reject} = scope.bindings;
        
        let is = false;
        traverse(path, {
            'reject(__)': ({parentPath}) => {
                is = compare(parentPath.parentPath, '__a.on(__b, __c);');
            },
        });
        
        if (is)
            return;
        
        if (resolve?.references) {
            const [referencePath] = resolve.referencePaths;
            
            if (isPassedToFn(referencePath))
                return false;
            
            return resolve.referencePaths[0].scope.uid === scope.uid;
        }
        
        return reject?.referencePaths[0].scope.uid === scope.uid;
    },
});

export const replace = () => ({
    'return new Promise(__a)'({__a}, path) {
        const {scope} = path.get('argument.arguments.0');
        
        let exclude = false;
        
        traverse(path, {
            'reject(__)': (rejectPath) => {
                const {node} = rejectPath.get('arguments.0');
                
                if (scope === rejectPath.scope.getFunctionParent())
                    replaceWith(rejectPath.parentPath, throwStatement(node));
            },
            'resolve(__)': (resolvePath) => {
                const {node} = resolvePath.get('arguments.0');
                
                if (resolvePath.parentPath.parentPath.isExpression()) {
                    replaceWith(resolvePath, returnStatement(node));
                    return;
                }
                
                if (scope === resolvePath.scope.getFunctionParent())
                    replaceWith(resolvePath.parentPath, returnStatement(node));
            },
            'resolve()': (resolvePath) => {
                if (scope === resolvePath.scope?.getFunctionParent())
                    remove(resolvePath.parentPath);
            },
            'reject': (path) => {
                if (checkIdentifier(path))
                    exclude = true;
            },
        });
        
        if (exclude)
            return path;
        
        const fn = path.scope.getFunctionParent().path.node;
        
        fn.async = true;
        
        return __a.body;
    },
});

function checkIdentifier(path) {
    const {parentPath} = path;
    const calleePath = parentPath.get('callee');
    
    return parentPath.isCallExpression() && calleePath !== path;
}
