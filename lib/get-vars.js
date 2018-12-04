
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
            initialize({path, returnPath, vars});
            traverseObjectProps({path, vars});
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

function initialize({path, returnPath, vars}) {
    const {
        node,
        scope,
    } = path;
    
    const name = getName(node);
    
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

function traverseObjectProps({path, vars, returnPath}) {
    const {
        node,
    } = path;
     
    if (!node.init)
        return;
    
    if (!node.init.properties)
        return;
     
    for (const prop of node.init.properties) {
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

