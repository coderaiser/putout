import {renameProperty} from './rename-property.js';

export const rename = (path, from, to) => {
    const bindings = path.scope.getAllBindings();
    const bindingCurrent = bindings[from];
    
    if (!bindingCurrent)
        return;
    
    const bindingPath = bindingCurrent.path;
    
    renameProperty(bindingPath, from, to);
    bindingPath.scope.rename(from, to);
};
