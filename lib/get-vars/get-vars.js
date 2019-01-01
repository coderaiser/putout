'use strict';

const {
    isArrayPattern,
    isIdentifier,
    isSpreadElement,
    isObjectExpression,
    isObjectPattern,
    isTemplateLiteral,
} = require('@babel/types');

const {assign} = Object;

module.exports = ({
    use,
    declare,
    addParams,
}) => {
    const traverseObj = traverseObjectExpression(use);
    const declareObj = traverseObjectExpression(declare);
    
    return {
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
                    Identifier(elPath) {
                        const {elements} = node.id;
                        
                        if (elements.length === 1)
                            return declare(path, elPath.node.name);
                        
                        assign(elPath, {
                            remove: removeArrayPatternElement(elPath),
                        });
                        
                        declare(elPath, elPath.node.name);
                    }
                });
            }
            
            const initPath = path.get('init');
            
            if (isIdentifier(init))
                use(path, init.name);
            else if (isObjectExpression(init))
                traverseObj(initPath.get('properties'));
            else if (isTemplateLiteral(init))
                initPath.traverse({
                    Identifier(path) {
                        use(path, path.node.name);
                    }
                });
        },
        
        AssignmentPattern(path) {
            const {
                left,
            } = path.node;
            
            if (isIdentifier(left))
                declare(path, left.name);
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
            else if (isObjectExpression(right))
                traverseObj(path.get('right.properties'));
        },
        
        ArrayExpression(path) {
            const {elements} = path.node;
            
            for (const el of elements) {
                if (isIdentifier(el))
                    use(path, el.name);
            }
        },
        
        ConditionalExpression(path) {
            const {
                test,
                consequent,
                alternate,
            } = path.node;
            
            if (isIdentifier(test))
                use(path, test.name);
            
            if (isIdentifier(consequent))
                use(path, consequent.name);
            
            if (isIdentifier(alternate))
                use(path, alternate.name);
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
            
            path.get('left').traverse({
                Identifier(path) {
                    use(path, path.node.name);
                }
            });
        },
        
        SwitchStatement(path) {
            const {node} = path;
            
            if (isIdentifier(node.discriminant))
                use(path, node.discriminant.name);
        },
        
        ReturnStatement(path) {
            const {node} = path;
            const {argument} = node;
            
            if (isIdentifier(argument))
                return use(path, argument.name);
            
            if (isObjectExpression(argument))
                return traverseObj(path.get('argument.properties'));
            
            if (isTemplateLiteral(argument))
                return path.get('argument').traverse({
                    Identifier(path) {
                        use(path, path.node.name);
                    }
                });
        },
        
        ArrowFunctionExpression(path) {
            const paramsPaths = path.get('params');
            const {
                body,
                params,
            } = path.node;
            
            for (const paramPath of paramsPaths) {
                const {node} = paramPath;
                if (isIdentifier(node)) {
                    declare(paramPath, node.name);
                    continue;
                }
                
                if (isObjectPattern(node)) {
                    declareObj(paramPath.get('properties'));
                    continue;
                }
                
                /*
                paramPath.traverse({
                    Identifier(path) {
                        declare(path.parentPath, path.node.name);
                    }
                });
                */
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
            else if (isObjectExpression(body))
                traverseObj(path.get('body.properties'));
            
            addParams({
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
                    traverseObj(path.get('properties'));
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
    };
};

const traverseObjectExpression = (use) => (propertiesPaths) => {
    for (const path of propertiesPaths) {
        const {node} = path;
        
        const {
            value,
        } = path.node;
        
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
        
        if (isSpreadElement(node)) {
            use(path, node.argument.name);
            continue;
        }
    }
};

const removeArrayPatternElement = (elPath) => {
    const {remove} = elPath;
    
    return () => {
        const el = elPath.node;
        const arrayPattern = elPath.parentPath.node;
        const {elements} = arrayPattern;
        
        const n = elements.length - 1;
        const i = elements.indexOf(el);
        
        if (i === n)
            return remove.call(elPath);
        
        elements[i] = null;
    };
};

