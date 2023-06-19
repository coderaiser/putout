'use strict';

const prefix = '__putout_declare_undefined_variables';
const getProgramParentPath = (path) => path.scope.getProgramParent().path;

const maybeInit = (a, b) => b[a] = b[a] || {};

module.exports.checkDeclarationForESLint = (name, path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    return programPath[prefix][name];
};

module.exports.addDeclarationForESLint = (name, path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    return programPath[prefix][name] = true;
};

module.exports.setModuleType = (type, path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    programPath[prefix].__putout_module_type = type;
    
    return type;
};

module.exports.getModuleType = (path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    return programPath[prefix].__putout_module_type;
};
