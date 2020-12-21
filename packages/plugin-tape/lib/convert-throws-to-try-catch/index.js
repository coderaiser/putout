'use strict';

const {template, operator} = require('putout');

const {traverse} = operator;

const requireTryCatch = template.ast(`const tryCatch = require('try-catch')`);

module.exports.report = () => 'try-catch should be used instead of t.throws';

const insertRequireTryCatch = (path) => {
    const parentScope = path.scope.getProgramParent();
    
    if (parentScope.bindings.tryCatch)
        return;
    
    let is = false;
    
    traverse(parentScope.block, {
        'const tryCatch = require("try-catch")'(path) {
            is = true;
            path.stop();
        },
    });
    
    if (!is)
        parentScope.block.body.unshift(requireTryCatch);
};

module.exports.replace = () => ({
    't.throws(__a, __b, __c)': ({__a, __b}, path) => {
        const tryCatchNode = template.ast.fresh(`
            const [error] = tryCatch(__a)
        `);
        
        tryCatchNode.declarations[0].init.arguments[0] = __a;
        
        path.insertBefore(tryCatchNode);
        insertRequireTryCatch(path);
        
        return `t.equal(error.message, '${__b.pattern}', __c)`;
    },
});
