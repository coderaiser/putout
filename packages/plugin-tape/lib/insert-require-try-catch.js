'use strict';

const {template, operator} = require('putout');
const {traverse} = operator;

const requireTryCatch = template.ast(`const tryCatch = require('try-catch')`);

module.exports = (path) => {
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

