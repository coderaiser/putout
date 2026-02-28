import {types} from 'putout';

const {
    isReturnStatement,
    isBlockStatement,
    isFunction,
    returnStatement,
} = types;

export const report = () => `Use 'early return' instead of 'else'`;

export const match = () => ({
    'if (__a) __body; else __c': check,
    'if (__a) __b; else __c': check,
});
export const replace = () => ({
    'if (__a) __body; else __c': (vars, path) => {
        const consequent = path.get('consequent');
        consequent.node.body.push(returnStatement());
        
        return path;
    },
    'if (__a) __b; else __c': `
    	if (__a) {
        	__b;
            return;
        } else 
        	__c
    `,
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
    
    return true;
}
