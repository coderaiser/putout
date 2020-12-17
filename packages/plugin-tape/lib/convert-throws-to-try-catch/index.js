'use strict';

const {template, operator} = require('putout');

const {traverse} = operator;

const requireTryCatch = template.ast(`const tryCatch = require('try-catch')`);
const buildTryCatch = template(`
    const [error] = tryCatch(NAME)
`);

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
        const node = buildTryCatch({
            NAME: __a.name,
        });
        
        path.insertBefore(node);
        insertRequireTryCatch(path);
        
        return `t.equal(error.message, '${__b.pattern}', __c)`;
    },
});
