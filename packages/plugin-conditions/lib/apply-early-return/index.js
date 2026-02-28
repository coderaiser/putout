import {types} from 'putout';

const {
    isReturnStatement,
    isBlockStatement,
    isFunction,
    returnStatement,
} = types;

export const report = () => `Use 'early return' instead of 'else'`;

export const match = () => ({
    'if (__a) __b; else __c': check,
});

export const replace = () => ({
    'if (__a) __b; else __c': ({__b}, path) => {
        if (isBlockStatement(__b)) {
            __b.body.push(returnStatement());
            
            return path;
        }
        
        return `
            if (__a) {
                __b;
                return;
            } else
                __c
        `;
    },
});

function check(vars, path) {
    if (!isFunction(path.parentPath.parentPath))
        return false;
    
    if (path.getNextSibling().node)
        return false;
    
    const consequent = path.get('consequent');
    
    if (isBlockStatement(consequent)) {
        const last = consequent.node.body.at(-1);
        
        if (isReturnStatement(last))
            return false;
    }
    
    return !hasReturn(path);
}

function hasReturn(path) {
    let has = false;
    
    path.traverse({
        ReturnStatement(path) {
            has = true;
            path.stop();
        },
    });
    
    return has;
}
