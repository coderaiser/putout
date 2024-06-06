import {types, operator} from 'putout';

const {getBinding} = operator;
const {isIdentifier} = types;

export const report = () => `Use 'var' instead of 'const'`;

export const match = () => ({
    'const __a = __b': ({__a}, path) => {
        if (!isIdentifier(__a))
            return false;
        
        const {name} = __a;
        
        return !hasOverlap(path, name);
    },
});

export const replace = () => ({
    'const __a = __b': 'var __a = __b',
});

function hasOverlap(path, name) {
    ({path} = path.scope.getBlockParent());
    
    if (path.isProgram())
        return false;
    
    let nextPath = path;
    
    while (nextPath = nextPath.scope.getBlockParent().path) {
        if (nextPath === path)
            break;
    }
    
    const program = nextPath.scope.getProgramParent().path;
    
    return getBinding(program, name);
}
