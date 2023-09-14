'use strict';

const {
    isReturnStatement,
    isBlockStatement,
} = require('putout').types;

module.exports.report = () => `Avoid useless 'else'`;

module.exports.match = () => ({
    'if (__a) __b; else __c': ({__b}) => {
        if (!isBlockStatement(__b))
            return isReturnStatement(__b);
        
        const {length} = __b.body;
        const latest = __b.body[length - 1];
        
        return isReturnStatement(latest);
    },
});

module.exports.replace = () => ({
    'if (__a) __b; else __c': `{
        if (__a) __b;
        __c;
    }`,
});
