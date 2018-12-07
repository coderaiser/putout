'use strict';

const traverse = require('@babel/traverse').default;

const isFn = (a) => typeof a === 'function';
const exec = (a, ...b) => isFn(a) && a(...b);
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

const {
    isIdentifier,
    isSpreadElement,
    isObjectExpression,
    isObjectPattern,
} = require('@babel/types');

module.exports = (ast, opts = {}) => {
    const vars = [];
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
    
    visitor(ast, {
        VariableDeclarator(path) {
            const {node} = path;
            
            if (isObjectPattern(node.id)) {
                if (isIdentifier(node.init))
                    use(path, node.init.name);
                
                path.traverse({
                    ObjectProperty(propPath) {
                        if (node.id.properties.includes(propPath.node))
                            declare(propPath, propPath.node.value.name);
                    }
                });
                
                return;
            }
            
            if (isObjectExpression(node.init)) {
                for (const property of node.init.properties) {
                    if (isSpreadElement(property))
                        use(path, property.argument.name);
                    else if (isIdentifier(property.value))
                        use(path, property.value.name);
                }
            }
            
            declare(path, path.node.id.name);
        },
        
        MemberExpression(path) {
            use(path, path.node.object.name);
        },
        
        ForOfStatement(path) {
            const {node} = path;
            
            if (isIdentifier(node.right))
                use(path, node.right.name);
        },
        
        ReturnStatement(path) {
            const {node} = path;
            
            if (isIdentifier(node.argument))
                use(path, node.argument.name);
        },
        
        ArrowFunctionExpression(path) {
            const {body, params} = path.node;
            
            if (isIdentifier(body))
                use(path, body.name);
            
            path.traverse({
                Identifier(path) {
                    if (params.includes(path.node))
                        declare(path, path.node.name);
                },
                ObjectPattern(path) {
                    const {properties} = path.node;
                    
                    for (const property of properties) {
                        if (isIdentifier(property.value))
                            declare(path, property.value.name);
                    }
                },
            });
        },
        
        CallExpression(path) {
            const {node} = path;
            const {callee} = node;
            
            if (isIdentifier(callee))
                use(path, node.callee.name);
             
            path.traverse({
                Identifier(path) {
                    if (node.arguments.includes(path.node))
                        use(path, path.node.name);
                }
            });
        },
        
        BinaryExpression(path) {
            const {left, right} = path.node;
            
            if (isIdentifier(left))
                use(path, left.name);
            
            if (isIdentifier(right))
                use(path, right.name);
        },
        
        FunctionDeclaration(path) {
            declare(path, path.node.id.name);
        },
    });
    
    return vars.filter(Boolean);
};

function visitor(ast, visit) {
    traverse(ast, {
        enter(node) {
            const {type} = node;
            const fn = visit[type];
            
            exec(fn, node);
        }
    });
}

function getScopeNumber(name, scope) {
    let i = 0;
    let x = 0;
    let done = false;
    
    if (scope.hasOwnBinding(name))
        done = true;
    
    while (scope.parent) {
        ++i;
        
        scope = scope.parent;
        
        if (!done && scope.hasOwnBinding(name))
            x = i;
    }
    
    if (!x && !done)
        x = i;
    
    const pos = i - x;
    
    return pos;
}

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

