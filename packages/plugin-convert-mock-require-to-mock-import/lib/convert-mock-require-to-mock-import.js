'use strict';

const {operator} = require('putout');

const {remove} = operator;

module.exports.report = () => '"mockImport" should be used instead of "mockRequire"';

module.exports.replace = () => ({
    'mockRequire(__a, __b)': 'mockImport(__a, __b)',
    'reRequire(__a)': (vars, path) => {
        const {scope} = path;
        const {block} = scope;
        
        if (!block.async)
            block.async = true;
        
        if (!scope.hasBinding('createMockImport'))
            maybeRemoveOldStopAll(scope);
        
        return 'await reImport(__a)';
    },
});

function maybeRemoveOldStopAll(scope) {
    const binding = scope.getBinding('stopAll');
    
    if (!binding)
        return;
    
    const {path} = binding;
    
    if (path)
        remove(path);
}
