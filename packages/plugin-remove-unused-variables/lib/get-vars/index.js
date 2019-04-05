'use strict';

const {
    traverse,
    types,
} = require('putout');

const {
    isClassDeclaration,
    isFunctionDeclaration,
} = types;

const getVars = require('./get-vars');
const {
    useParamsBeforeLastUsed,
    usePropertiesBeforeRest,
} = require('./use-params');

module.exports = (ast, opts = {}) => {
    const vars = {};
    const allParams = [];
    const {setPath} = opts;
    
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
        }));
    
    return Object.values(vars);
};

const addParamsVariable = (allParams) => ({chunk, params}) => {
    allParams.push({
        chunk,
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

const isUsedVariable = ({vars}) => (chunk, name) => {
    debugger;
    const {scope} = chunk;
    const uid = getScopeUID({
        name,
        scope,
    });
    
    const current = vars[uid];
    const {used} = current[name];
    
    return used;
};

function getScope(chunk) {
    const {
        node,
        scope,
    } = chunk;
    
    if (isFunctionDeclaration(node))
        return chunk.parentPath.scope;
    
    if (isClassDeclaration(node))
        return chunk.parentPath.scope;
    
    return scope;
}

const declareVariable = ({vars, setPath}) => (chunk, name) => {
    const scope = getScope(chunk);
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
        current[name].chunk = chunk;
};

const useVariable = ({vars}) => (chunk, name) => {
    const {scope} = chunk;
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

