'use strict';

const {template} = require('putout');

const requireTryCatch = template.ast(`const tryCatch = require('try-catch')`);

module.exports = (path) => {
    const parentScope = path.scope.getProgramParent();
    
    if (parentScope.bindings.tryCatch)
        return;
    
    parentScope.block.body.unshift(requireTryCatch);
};

