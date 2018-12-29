'use strict';

const traverse = require('@babel/traverse').default;
const {
    isIdentifier,
} = require('@babel/types');

const getVars = require('./get-vars');

module.exports = (ast, opts = {}) => {
    const vars = {};
    const allParams = [];
    const {
        setPath,
        setLoc,
    } = opts;
    
    const use = useVariable({
        vars,
    });
    
    const declare = declareVariable({
        vars,
        setPath,
        setLoc,
    });
    
    const isUsed = isUsedVariable({
        vars,
    });
    
    const addParams = addParamsVariable(allParams);
    
    //fixBabelObjectProperty(ast);
    
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

// @babel/traverse uses ObjectProperty in ObjectPattern
// but according to standard Property should be used
// all other parsers use Property.
//
// Remove when this will be fixed
// https://github.com/babel/babel/issues/9251
// https://github.com/babel/babel/pull/9258
/*
function fixBabelObjectProperty(ast) {
    traverse(ast, {
        noScope: true,
        FunctionExpression(path) {
            console.log(path.node.loc);
        },
        ObjectMethod(path) {
            console.log(path.node.loc);
        },
        enter(path) {
            if (path.type === 'Property') {
                path.node.type = 'ObjectProperty';
                return;
            }
            
            if (path.type === 'FunctionExpression') {
                path.node.type = 'ObjectMethod';
                return;
            }
        },
    });
}
*/

function getScopeNumber(name, scope) {
    let done = false;
    
    if (scope.hasOwnBinding(name)) {
        done = true;
        return getLocLine(scope.block);
    }
    
    while (scope.parent) {
        scope = scope.parent;
        
        if (!done && scope.hasOwnBinding(name))
            return getLocLine(scope.block);
    }
    
    return getLocLine(scope.block);
}

const isUsedVariable = ({vars}) => (path, name) => {
    const {scope} = path;
    const scopeNumber = getScopeNumber(name, scope);
    
    const current = vars[scopeNumber];
    const {used} = current[name];
    
    return used;
};

const declareVariable = ({vars, setPath, setLoc}) => (path, name) => {
    const {scope, node} = path;
    const scopeNumber = getScopeNumber(name, scope);
    
    if (!vars[scopeNumber])
        vars[scopeNumber] = {};
    
    const current = vars[scopeNumber];
    if (current[name])
        current[name].declared = true;
    else
        current[name] = {
            declared: true,
            used: false,
        };
    
    if (setPath)
        current[name].path = path;
    
    if (setLoc)
        current[name].loc = getPosition(node);
};

const useVariable = ({vars}) => (path, name) => {
    const {scope} = path;
    const scopeNumber = getScopeNumber(name, scope);
    
    if (!vars[scopeNumber])
        vars[scopeNumber] = {};
    
    const current = vars[scopeNumber];
    if (current[name])
        current[name].used = true;
    else
        current[name] = {
            declared: false,
            used: true,
        };
};

const getPosition = ({loc}) => {
    const {
        line,
        column,
    } = loc.start;
    
    return {
        line,
        column,
    };
};

const getLocLine = ({loc}) => {
    const {
        line,
        column,
    } = loc.start;
    
    return `${line}:${column}`;
};

const useParamsBeforeLastUsed = ({use, isUsed}) => ({path, params}) => {
    let i = params.length;
    
    while (--i > 0) {
        const param = params[i];
        
        if (!isIdentifier(param))
            continue;
        
        const {name} = param;
        
        if (isUsed(path, name))
            break;
    }
    
    while (--i >= 0) {
        if (!isIdentifier(params[i]))
            continue;
        
        use(path, params[i].name);
    }
};

