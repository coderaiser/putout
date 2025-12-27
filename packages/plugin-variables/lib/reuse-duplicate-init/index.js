import {operator} from 'putout';

const {replaceWith} = operator;

export const report = () => 'Reuse duplicate init';

export const fix = ({path, newPath}) => {
    replaceWith(path.get('declarations.0.init'), newPath);
};

export const exclude = () => [
    'const __a = __identifier',
];

export const traverse = ({push, store}) => ({
    'const __identifier = __b'(path) {
        const idPath = path.get('declarations.0.id');
        const initPath = path.get('declarations.0.init');
        const initName = initPath.toString();
        
        store(initName, idPath);
    },
    
    'const __object = __b'(path) {
        const initPath = path.get('declarations.0.init');
        const initName = initPath.toString();
        
        for (const propPath of path.get('declarations.0.id.properties')) {
            if (propPath.isRestElement())
                continue;
            
            const nestedPath = propPath.get('key');
            const nestedName = nestedPath.toString();
            
            store(`${initName}.${nestedName}`, nestedPath);
        }
        
        const newPath = store(initName);
        
        if (!newPath || !newPath.node)
            return;
        
        if (path === newPath.parentPath.parentPath)
            return;
        
        if (path.scope.uid !== newPath.scope.uid)
            return;
        
        push({
            path,
            newPath,
        });
    },
});
