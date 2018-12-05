
'use strict';

const traverse = require('@babel/traverse').default;
const isFn = (a) => typeof a === 'function';
const exec = (a, ...b) => isFn(a) && a(...b);
const getPosition = ({loc}) => loc.start;

const {
    isArrowFunctionExpression,
    isCallExpression,
    isFunctionDeclaration,
    isSpreadElement,
    isObjectExpression,
    isObjectPattern,
    isProperty,
} = require('@babel/types');

const isFunction = (a) => {
    const isFnDecl = isFunctionDeclaration(a);
    const isCall = isCallExpression(a);
    const isArrow = isArrowFunctionExpression(a);
    
    return isFnDecl || isCall || isArrow;
};

module.exports = (ast, opts = {}) => {
    const vars = [];
    const {
        returnPath = true,
    } = opts;
    
    visitor(ast, {
        VariableDeclarator(path) {
            initialize({path, vars, returnPath});
            traverseProps({path, vars, returnPath});
        },
        
        ObjectPattern(path) {
            traverseProps({path, vars, returnPath});
        },
        
        Identifier(path) {
            const {
                node,
                key,
            } = path;
            
            const {
                name,
            } = node;
            
            if (key === 'property')
                return;
            
            inc({
                name,
                path,
                vars,
                returnPath,
            });
        },
    });
    
    return vars;
};

function getName(node) {
    if (isObjectExpression(node) || isProperty(node))
        return node.value.name;
    
    return node.name || node.id.name;
}

function initialize({path, returnPath, vars, name}) {
    const {
        node,
        scope,
    } = path;
    
    name = name || getName(node);
    
    const {
        line,
        column,
    } = getPosition(node);
    
    init({
        name,
        scope,
        vars,
        path,
        returnPath,
        loc: {
            line,
            column,
        },
    });
}

function visitor(ast, visit) {
    traverse(ast, {
        enter(node) {
            const {type} = node;
            const fn = visit[type];
            
            exec(fn, node);
        }
    });
}

function getProperties(node) {
    if (isObjectPattern(node))
        return node.properties;
    
    if (!node.init)
        return;
    
    return node.init.properties;
}

function traverseProps({path, vars, returnPath}) {
    const {
        node,
    } = path;
     
    const properties = getProperties(node);
    
    if (!properties)
        return;
     
    for (const prop of properties) {
        if (isSpreadElement(prop))
            continue;
        
        const name = getName(prop);
        
        inc({
            name,
            path,
            vars,
            returnPath,
        });
    }
}

function init({vars, name, scope, path, loc, returnPath}) {
    const scopeNumber = getScopeNumber(name, scope);
    
    if (!vars[scopeNumber])
        vars[scopeNumber] = {};
    
    vars[scopeNumber][name] = {
        count: 0,
        loc,
    };
    
    if (!returnPath)
        return;
    
    vars[scopeNumber][name].path = path;
}

function inc({name, path, vars, returnPath}) {
    const {
        scope,
        parent,
    } = path;
    
    const scopeNumber = getScopeNumber(name, scope);
    const isFn = isFunction(parent);
    
    if (!isFn && (!vars[scopeNumber] || !vars[scopeNumber][name])) {
        return;
    }
    
    if (!vars[scopeNumber])
        vars[scopeNumber] = {};
    
    if (!vars[scopeNumber][name])
        initialize({
            name,
            path,
            scope,
            vars,
            returnPath,
        });
    
    vars[scopeNumber][name].count += 1;
}

function getScopeNumber(name, scope) {
    let i = 0;
    let x = 0;
    
    while (scope.parent) {
        ++i;
        
        scope = scope.parent;
        
        if (scope.hasOwnBinding(name))
            x = i;
    }
    
    const pos = i - x;
    
    return pos;
}

