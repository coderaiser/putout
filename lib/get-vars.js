'use strict';

const traverse = require('@babel/traverse').default;

const isFn = (a) => typeof a === 'function';
const exec = (a, ...b) => isFn(a) && a(...b);

const {
    isArrayPattern,
    isIdentifier,
    isSpreadElement,
    isObjectExpression,
    isObjectPattern,
    isTemplateLiteral,
} = require('@babel/types');

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
    
    const useParams = useParamsBeforeLastUsed({
        use,
        isUsed,
    });
    
    const traverseObj = traverseObjectExpression(use);
    
    visitor(ast, {
        VariableDeclarator(path) {
            const {node} = path;
            const {init} = node;
            
            if (isIdentifier(node.id)) {
                declare(path, node.id.name);
            } else if (isObjectPattern(node.id)) {
                path.get('id').traverse({
                    ObjectProperty(propPath) {
                        if (!isIdentifier(propPath.node.value))
                            return;
                        
                        const {properties} = node.id;
                        const isOne = properties.length === 1;
                        const nodePath = isOne ? path : propPath;
                        
                        declare(nodePath, propPath.node.value.name);
                    }
                });
            } else if (isArrayPattern(node.id)) {
                path.get('id').traverse({
                    Identifier(path) {
                        declare(path, path.node.name);
                    }
                });
            }
            
            if (isIdentifier(init))
                use(path, init.name);
            else if (isObjectExpression(init))
                traverseObj(path, init.properties);
            else if (isTemplateLiteral(init))
                path.get('init').traverse({
                    Identifier(path) {
                        use(path, path.node.name);
                    }
                });
        },
        
        AssignmentExpression(path) {
            const {node} = path;
            const {
                left,
                right,
            } = node;
            
            if (isIdentifier(left))
                use(path, left.name);
            
            if (isIdentifier(right))
                use(path, right.name);
        },
        
        ArrayExpression(path) {
            const {elements} = path.node;
            
            for (const el of elements) {
                if (isIdentifier(el))
                    use(path, el.name);
            }
        },
        
        ConditionalExpression(path) {
            const {test} = path.node;
            
            if (isIdentifier(test))
                use(path, test.name);
        },
        
        LogicalExpression(path) {
            const {left, right} = path.node;
            
            if (isIdentifier(left))
                use(path, left.name);
            
            if (isIdentifier(right))
                use(path, right.name);
        },
        
        MemberExpression(path) {
            const {
                property,
                object,
                computed,
            } = path.node;
            
            use(path, object.name);
            
            if (computed && isIdentifier(property))
                use(path, property.name);
        },
        
        NewExpression(path) {
            const {
                node,
            } = path;
            
            if (isIdentifier(node.callee))
                use(path, node.callee.name);
            
            for (const arg of node.arguments) {
                if (isIdentifier(arg))
                    use(path, arg.name);
            }
        },
        
        UnaryExpression(path) {
            const {argument} = path.node;
            
            if (isIdentifier(argument))
                use(path, argument.name);
        },
        
        IfStatement(path) {
            const {node} = path;
            const {test} = node;
            
            if (isIdentifier(test))
                return use(path, test.name);
            
            path.get('test').traverse({
                Identifier(path) {
                    use(path, path.node.name);
                }
            });
        },
        
        ForOfStatement(path) {
            const {node} = path;
            const {
                left,
                right,
            } = node;
            
            if (isIdentifier(right))
                use(path, right.name);
            
            if (isIdentifier(left))
                use(path, left.name);
            else
                path.get('left').traverse({
                    Identifier(leftPath) {
                        declare(path, leftPath.node.name);
                    }
                });
            
            const {body} = node;
            const isEmptyBody = body.body && body.body.length;
            if (isEmptyBody)
                path.get('left').traverse({
                    Identifier(path) {
                        use(path, path.node.name);
                    }
                });
        },
        
        ReturnStatement(path) {
            const {node} = path;
            const {argument} = node;
            
            if (isIdentifier(argument))
                return use(path, argument.name);
            
            if (isObjectExpression(argument))
                return traverseObj(path, argument.properties);
            
            if (isTemplateLiteral(argument))
                return path.get('argument').traverse({
                    Identifier(path) {
                        use(path, path.node.name);
                    }
                });
        },
        
        ArrowFunctionExpression(path) {
            const {body, params} = path.node;
            const paramsPaths = path.get('params');
            
            for (const paramPath of paramsPaths) {
                const {node} = paramPath;
                if (isIdentifier(node)) {
                    declare(paramPath, node.name);
                    continue;
                }
                
                paramPath.traverse({
                    Identifier(path) {
                        declare(path.parentPath, path.node.name);
                    }
                });
            }
            
            if (isTemplateLiteral(body)) {
                const {expressions} = body;
                
                for (const exp of expressions) {
                    if (isIdentifier(exp))
                        use(path, exp.name);
                }
            }
            
            if (isIdentifier(body))
                use(path, body.name);
            
            allParams.push({
                path,
                params,
            });
        },
        
        CallExpression(path) {
            const {node} = path;
            const {callee} = node;
            
            if (isIdentifier(callee))
                use(path, node.callee.name);
             
            path.traverse({
                TemplateLiteral(path) {
                    const {node} = path;
                    const {expressions} = node;
                    
                    for (const exp of expressions) {
                        if (isIdentifier(exp))
                            use(path, exp.name);
                    }
                },
                ObjectExpression(path) {
                    const {node} = path;
                    const {properties} = node;
                    
                    traverseObj(path, properties);
                },
                SpreadElement(path) {
                    const {argument} = path.node;
                    
                    if (isIdentifier(argument))
                        use(path, argument.name);
                },
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
    
    for (const {path, params} of allParams)
        useParams({
            path,
            params,
        });
    
    return Object.values(vars);
};

const traverseObjectExpression = (use) => (path, properties) => {
    for (const property of properties) {
        const {
            value,
        } = property;
        
        if (isIdentifier(value)) {
            use(path, value.name);
            continue;
        }
        
        if (isTemplateLiteral(value)) {
            const {expressions} = value;
            for (const exp of expressions) {
                if (isIdentifier(exp))
                    use(path, exp.name);
            }
            continue;
        }
        
        if (isSpreadElement(property)) {
            use(path, property.argument.name);
            continue;
        }
    }
};

function visitor(ast, visit) {
    traverse(ast, {
        enter(node) {
            const {
                type,
            } = node;
            
            const fn = visit[type];
            exec(fn, node);
        }
    });
}

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
        current[name].path = current[name].path || path;
    
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

