
'use strict';

const traverse = require('@babel/traverse').default;
const isFn = (a) => typeof a === 'function';
const exec = (a, ...b) => isFn(a) && a(...b);

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
        
        FunctionDeclaration(path) {
            initialize({path, returnPath, vars});
        },
        
        Identifier(path) {
            const {
                node,
                scope,
            } = path;
            
            const {name} = node;
            
            inc({
                name,
                scope,
                vars,
            });
        },
    });
    
    return vars;
};

function getName(node) {
    const {name} = node.property || {};
    return node.id.name || node.init.name || name;
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
    } = node.loc.start;
    
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

function traverseObjectProps({path, vars}) {
    const {
        node,
        scope,
    } = path;
     
    if (!node.init.properties)
        return;
    
    for (const prop of node.init.properties) {
        const {name} = prop.value;
        
        inc({
            name,
            scope,
            vars,
        });
    }
}

function init({vars, name, scope, path, loc, returnPath}) {
    const pos = getPos(name, scope);
    
    if (!vars[pos])
        vars[pos] = {};
    
    vars[pos][name] = {
        count: 0,
        loc,
    };
    
    if (!returnPath)
        return;
    
    vars[pos][name].path = path;
}

function inc({name, scope, vars}) {
    const pos = getPos(name, scope);
    
    if (!vars[pos] || !vars[pos][name])
        return;
    
    vars[pos][name].count += 1;
}

function getPos(name, scope) {
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

