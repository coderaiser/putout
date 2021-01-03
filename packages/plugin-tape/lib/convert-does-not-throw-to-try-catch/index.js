'use strict';

const {template} = require('putout');

const insertRequireTryCatch = require('../insert-require-try-catch');

module.exports.report = () => 'try-catch should be used instead of t.doesNotThrow';

module.exports.replace = () => ({
    't.doesNotThrow(__a, __b)': ({__a}, path) => {
        const tryCatchNode = template.ast.fresh(`
            const [error] = tryCatch(__a)
        `);
        
        tryCatchNode.declarations[0].init.arguments[0] = __a;
        
        path.insertBefore(tryCatchNode);
        insertRequireTryCatch(path);
        
        return `t.notOk(error, __b)`;
    },
});
