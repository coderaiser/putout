import {types} from 'putout';

const {
    isReturnStatement,
    isBlockStatement,
    isContinueStatement,
    isBreakStatement,
} = types;

export const report = () => `Avoid useless 'else'`;

export const match = () => ({
    'if (__a) __b; else __c': ({__b}) => {
        if (!isBlockStatement(__b))
            return isReturnLike(__b);
        
        const latest = __b.body.at(-1);
        
        return isReturnLike(latest);
    },
});

export const replace = () => ({
    'if (__a) __b; else __c': `{
        if (__a) __b;
        __c;
    }`,
});

function isReturnLike(node) {
    if (isReturnStatement(node))
        return true;
    
    if (isContinueStatement(node))
        return true;
    
    return isBreakStatement(node);
}
