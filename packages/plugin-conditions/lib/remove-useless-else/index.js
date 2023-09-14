'use strict';

const {
    isReturnStatement,
    isBlockStatement,
    isContinueStatement,
    isBreakStatement,
} = require('putout').types;

module.exports.report = () => `Avoid useless 'else'`;

module.exports.match = () => ({
    'if (__a) __b; else __c': ({__b}) => {
        if (!isBlockStatement(__b))
            return isReturnLike(__b);
        
        const latest = __b.body.at(-1);
        
        return isReturnLike(latest);
    },
});

module.exports.replace = () => ({
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
