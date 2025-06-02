'use strict';

const {renameProperty} = require('./rename-property');

module.exports.rename = (path, from, to) => {
    const bindings = path.scope.getAllBindings();
    const bindingCurrent = bindings[from];
    
    if (!bindingCurrent)
        return;
    
    const bindingPath = bindingCurrent.path;
    
    renameProperty(bindingPath, from, to);
    bindingPath.scope.rename(from, to);
};
