
'use strict';

const traverse = require('@babel/traverse').default;
const isFn = (a) => typeof a === 'function';
const exec = (a, ...b) => isFn(a) && a(...b);
const getPosition = ({loc}) => loc.start;

const {isCallExpression} = require('@babel/types');

module.exports = (ast, opts = {}) => {
    const vars = [];
    const {
        returnPath = true,
    } = opts;
    
    visitor(ast, {
        VariableDeclarator(path) {
            initialize({path, returnPath, vars});
            traverseObjectProps({path, vars});
            traverseFnParams({path, returnPath, vars});
        },
        
        Identifier(path) {
            const {
                node,
                parent,
            } = path;
            
            const {name} = node;
            
            const called = isCallExpression(parent);
            
            inc({
                name,
                path,
                vars,
                called,
                returnPath,
            });
        },
    });
    
    return vars;
};

function getName(node) {
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
     
    if (!node.init.properties)
        return;
    
    for (const prop of node.init.properties) {
        const {name} = prop.value;
        
        inc({
            name,
            path,
            vars,
            returnPath,
        });
    }
}

function traverseFnParams({path, vars, returnPath}) {
    const {
        node,
        scope,
    } = path;
    
    const {params} = node.init;
     
    if (!params)
        return;
    
    for (const param of params) {
        const {name} = param;
        
        const {
            line,
            column,
        } = getPosition(param);
        
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

function inc({name, path, vars, called, returnPath}) {
    const {scope} = path;
    const scopeNumber = getScopeNumber(name, scope);
    
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
    
    if (called)
        vars[scopeNumber][name].called = called;
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

