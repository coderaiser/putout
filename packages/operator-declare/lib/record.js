const prefix = '__putout_declare';
const getProgramParentPath = (path) => path.scope.getProgramParent().path;

const maybeInit = (a, b) => b[a] = b[a] || {};

export const checkDeclarationForESLint = (name, path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    return programPath[prefix][name];
};

export const addDeclarationForESLint = (name, path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    programPath[prefix][name] = true;
};

export const setModuleType = (type, path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    programPath[prefix].__putout_module_type = type;
    
    return type;
};

export const getModuleType = (path) => {
    const programPath = getProgramParentPath(path);
    maybeInit(prefix, programPath);
    
    return programPath[prefix].__putout_module_type;
};
