'use strict';

module.exports.getBinding = getBinding;
function getBinding(path, name) {
    const binding = path.scope.bindings[name];
    
    if (binding)
        return binding;
    
    while (path = path.parentPath) {
        const binding = path.scope.bindings[name];
        
        if (binding)
            return binding;
    }
    
    return null;
}

module.exports.getBindingPath = (path, name) => getBinding(path, name)?.path;
