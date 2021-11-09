'use strict';

module.exports.report = () => `Call 'reImport()' using await`;

module.exports.match = () => ({
    'reImport(__a)': (vars, path) => {
        const {parentPath} = path;
        
        if (parentPath.isAwaitExpression())
            return false;
        
        return true;
    },
});

module.exports.replace = () => ({
    'reImport(__a)': (vars, path) => {
        path.scope.block.async = true;
        return 'await reImport(__a)';
    },
});

