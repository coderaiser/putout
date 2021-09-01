'use strict';

const prefix = '__putout_declare_undefined_variables';
const getProgramParentPath = (path) => path.scope.getProgramParent().path;

const maybeInit = (a, b) => b[a] = b[a] || {};

module.exports.checkDeclaration = (name, path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    return programPath[prefix][name];
};

module.exports.addDeclaration = (name, path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    return programPath[prefix][name] = true;
};

