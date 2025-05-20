import {types, operator} from 'putout';

const {remove} = operator;
const {values} = Object;

const {
    isFunction,
    isProgram,
    isIdentifier,
} = types;

const isTop = (a) => isFunction(a) || isProgram(a);

export const report = (path) => `Avoid useless argument: '${path.node.name}'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    Function(path) {
        if (path.parentPath.isExportDeclaration())
            return;
        
        const {bindings} = path.scope;
        const params = path.get('params');
        
        const allParams = [];
        const indexes = [];
        
        for (const binding of values(bindings)) {
            const {path} = binding;
            
            if (!path.isIdentifier())
                continue;
            
            if (!binding.references && path.node) {
                indexes.push(params.indexOf(path));
                allParams.push(path);
            }
        }
        
        if (!path.isFunctionDeclaration() && !path.parentPath.isVariableDeclarator())
            return;
        
        const name = parseName(path);
        const allArgs = [];
        
        operator.traverse(path.parentPath.find(isTop), {
            [`${name}(__args)`](path) {
                const args = path.get('arguments');
                
                for (const index of indexes) {
                    const current = args[index];
                    
                    if (!isIdentifier(current))
                        continue;
                    
                    allArgs.push(args[index]);
                }
            },
        });
        
        if (!allArgs.length)
            return;
        
        allParams.map(push);
        allArgs.map(push);
    },
});

function parseName(path) {
    if (path.parentPath.isVariableDeclarator())
        return path.parentPath.node.id.name;
    
    return path.node.id.name;
}
