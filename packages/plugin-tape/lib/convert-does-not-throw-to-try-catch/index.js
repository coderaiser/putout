'use strict';

const {template, operator} = require('putout');
const {insertBefore} = operator;

module.exports.report = () => 'try-catch should be used instead of t.doesNotThrow';

module.exports.replace = () => ({
    't.doesNotThrow(__a, __b)': ({__a}, path) => {
        const tryCatchNode = template.ast.fresh(`
            const [error] = tryCatch(__a)
        `);
        
        tryCatchNode.declarations[0].init.arguments[0] = __a;
        
        insertBefore(path, tryCatchNode);
        
        return `t.notOk(error, __b)`;
    },
});
