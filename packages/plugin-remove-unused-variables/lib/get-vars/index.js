'use strict';

const {
    traverse,
    types,
} = require('putout');

const {
    isAssignmentPattern,
    isIdentifier,
    isClassDeclaration,
    isFunctionDeclaration,
    isObjectPattern,
} = types;

const getVars = require('./get-vars');

module.exports = (ast, opts = {}) => {
    const vars = {};
    const allParams = [];
    const {
        setPath,
    } = opts;
    
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
    
    allParams.map(useParamsBeforeLastUsed({
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
    let done = false;
    
    if (scope.hasOwnBinding(name)) {
        done = true;
        return scope.uid;
    }
    
    while (scope.parent) {
        scope = scope.parent;
        
        if (!done && scope.hasOwnBinding(name))
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
    const {
        node,
        scope,
    } = path;
    
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

const useParamsBeforeLastUsed = ({use, isUsed}) => ({path, params}) => {
    let i = params.length;
    
    while (--i > 0) {
        const param = params[i];
        
        if (traverseIsUsed(isUsed, path, param))
            break;
    }
    
    while (--i >= 0) {
        if (!isIdentifier(params[i]))
            continue;
        
        use(path, params[i].name);
    }
};

const traverseIsUsed = (isUsed, path, node) => {
    if (isIdentifier(node))
        return isUsed(path, node.name);
    
    if (isObjectPattern(node))
        return isUsedObjectPattern(isUsed, path, node);
    
    if (isAssignmentPattern(node))
        return isUsedAssignmentPattern(isUsed, path, node);
};

const isUsedAssignmentPattern = (isUsed, path, node) => {
    const {left} = node;
    
    if (isIdentifier(left))
        return isUsed(path, left.name);
};

const isUsedObjectPattern = (isUsed, path, node) => {
    for (const prop of node.properties) {
        const {value} = prop;
        
        if (isIdentifier(value)) {
            if (isUsed(path, value.name))
                return true;
            
            continue;
        }
    }
    
    return false;
};

