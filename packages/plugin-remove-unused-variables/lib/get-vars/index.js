'use strict';

const {types} = require('putout');
const getVars = require('./get-vars');

const {
    useParamsBeforeLastUsed,
    useParamsBeforeAssign,
    usePropertiesBeforeRest,
} = require('./use-params');

const {
    isClassDeclaration,
    isFunctionDeclaration,
} = types;

module.exports = (ast, opts) => {
    const vars = {};
    const allParams = [];
    
    const {setPath, traverse} = opts;
    const use = useVariable({
        vars,
    });
    
    const declare = declareVariable({
        vars,
        setPath,
    });
    
    const isUsed = isUsedVariable({
        vars,
    });
    
    const addParams = addParamsVariable(allParams);
    
    traverse(ast, getVars({
        use,
        declare,
        addParams,
    }));
    
    allParams
        .map(useParamsBeforeLastUsed({
            use,
            isUsed,
        }))
        .map(usePropertiesBeforeRest({
            use,
        }))
        .map(useParamsBeforeAssign({
            use,
            isUsed,
        }));
    
    return Object.values(vars);
};

const addParamsVariable = (allParams) => ({path, params}) => {
    allParams.push({
        path,
        params,
    });
};

function getScopeUID({name, scope}) {
    if (scope.hasOwnBinding(name))
        return scope.uid;
    
    while (scope.parent) {
        scope = scope.parent;
        
        if (scope.hasOwnBinding(name))
            return scope.uid;
    }
    
    return scope.uid;
}

const isUsedVariable = ({vars}) => (path, name) => {
    const {scope} = path;
    
    const uid = getScopeUID({
        name,
        scope,
    });
    
    const current = vars[uid];
    const {used} = current[name];
    
    return used;
};

function getScope(path) {
    const {node, scope} = path;
    
    if (isFunctionDeclaration(node))
        return path.parentPath.scope;
    
    if (isClassDeclaration(node))
        return path.parentPath.scope;
    
    return scope;
}

const declareVariable = ({vars, setPath}) => (path, name) => {
    const scope = getScope(path);
    
    const uid = getScopeUID({
        name,
        scope,
    });
    
    if (!vars[uid])
        vars[uid] = {};
    
    const current = vars[uid];
    
    if (current[name])
        current[name].declared = true;
    else
        current[name] = {
            declared: true,
            used: false,
        };
    
    if (setPath)
        current[name].path = path;
};

const useVariable = ({vars}) => (path, name) => {
    const {scope} = path;
    
    const uid = getScopeUID({
        name,
        scope,
    });
    
    if (!vars[uid])
        vars[uid] = {};
    
    const current = vars[uid];
    
    if (current[name])
        current[name].used = true;
    else
        current[name] = {
            declared: false,
            used: true,
        };
};
