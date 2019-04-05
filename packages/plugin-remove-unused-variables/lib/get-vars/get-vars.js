'use strict';

const {
    isArrayPattern,
    isAssignmentPattern,
    isClassDeclaration,
    isIdentifier,
    isSpreadElement,
    isObjectPattern,
    isObjectExpression,
    isFunctionDeclaration,
    isArrayExpression,
    isVariableDeclaration,
} = require('putout').types;

const {
    traverseObjectExpression,
    traverseArrayExpression,
    traverseAssignmentExpression,
    traverseTemplateLiteral,
} = require('./traverse');

const {assign} = Object;
const getName = (a) => a.name;

module.exports = ({use, declare, addParams}) => {
    const traverseObj = traverseObjectExpression(use);
    const declareObj = traverseObjectExpression(declare);
    
    const traverseAssign = traverseAssignmentExpression(use);
    const declareAssign = traverseAssignmentExpression(declare);
    
    const traverseTmpl = traverseTemplateLiteral(use);
    const traverseArray = traverseArrayExpression(use);
    
    return {
        ObjectExpression({properties}) {
            traverseObj(properties);
        },
        
        SpreadElement(chunk) {
            const {argument} = chunk;
            
            if (isIdentifier(argument))
                use(chunk, argument.name);
        },
        
        RestElement(chunk) {
            const {argument} = chunk;
            
            if (isIdentifier(argument))
                declare(chunk, argument.name);
        },
        
        VariableDeclarator(chunk) {
            const {id, init} = chunk;
            
            if (isIdentifier(id)) {
                declare(chunk, id.name);
            } else if (isObjectPattern(id)) {
                id.traverse({
                    ObjectProperty(prop) {
                        if (isAssignmentPattern(prop.value)) {
                            traverseAssign(prop.value.right);
                            declareAssign(prop.value.left);
                            return;
                        }
                        
                        if (!isIdentifier(prop.value))
                            return;
                        
                        const {properties} = id;
                        const isOne = properties.length === 1;
                        const nodePath = isOne ? chunk : prop;
                        
                        declare(nodePath, prop.node.value.name);
                    },
                });
            } else if (isArrayPattern(id)) {
                id.traverse({
                    Identifier(el) {
                        const {elements} = id;
                        
                        if (elements.length === 1)
                            return declare(chunk, el.name);
                        
                        assign(el, {
                            remove: removeArrayPatternElement(el),
                        });
                        
                        declare(el, el.name);
                    },
                });
            }
            
            if (isIdentifier(init))
                use(chunk, init.name);
            else if (isArrayExpression(init))
                traverseArray(init.elements);
        },
        
        ClassDeclaration(chunk) {
            const {node} = chunk;
            const {
                id,
                superClass,
            } = node;
            
            if (superClass)
                use(chunk, superClass.name);
            
            declare(chunk, id.name);
        },
        
        AssignmentExpression(chunk) {
            traverseAssign(chunk.get('left'));
            traverseAssign(chunk.get('right'));
        },
        
        ArrayExpression(chunk) {
            const {elements} = chunk.node;
            
            for (const el of elements) {
                if (isIdentifier(el)) {
                    use(chunk, el.name);
                    continue;
                }
                
                if (isSpreadElement(el)) {
                    use(chunk, el.argument.name);
                    continue;
                }
            }
        },
        
        ConditionalExpression(chunk) {
            const {
                test,
                consequent,
                alternate,
            } = chunk.node;
            
            if (isIdentifier(test))
                use(chunk, test.name);
            
            if (isIdentifier(consequent))
                use(chunk, consequent.name);
            
            if (isIdentifier(alternate))
                use(chunk, alternate.name);
        },
        
        TemplateLiteral(chunk) {
            traverseTmpl(chunk, chunk.node.expressions);
        },
        
        LogicalExpression(chunk) {
            const {left, right} = chunk.node;
            
            if (isIdentifier(left))
                use(chunk, left.name);
            
            if (isIdentifier(right))
                use(chunk, right.name);
        },
        
        MemberExpression(chunk) {
            const {
                property,
                object,
                computed,
            } = chunk.node;
            
            if (isIdentifier(object))
                use(chunk, object.name);
            
            if (computed && isIdentifier(property))
                use(chunk, property.name);
        },
        
        NewExpression(chunk) {
            const {node} = chunk;
            
            if (isIdentifier(node.callee))
                use(chunk, node.callee.name);
            
            const argPaths = chunk.get('arguments');
            
            for (const argPath of argPaths) {
                const {node} = argPath;
                
                if (isIdentifier(node)) {
                    use(chunk, node.name);
                    continue;
                }
            }
        },
        
        TaggedTemplateExpression(chunk) {
            const {tag} = chunk.node;
            
            if (isIdentifier(tag))
                use(chunk, tag.name);
        },
        
        UnaryExpression(chunk) {
            const {argument} = chunk.node;
            
            if (isIdentifier(argument))
                use(chunk, argument.name);
        },
        
        UpdateExpression(chunk) {
            const {argument} = chunk.node;
            
            if (isIdentifier(argument))
                use(chunk, argument.name);
        },
        
        ThrowStatement(chunk) {
            const {argument} = chunk.node;
            
            if (isIdentifier(argument))
                use(chunk, argument.name);
        },
        
        IfStatement(chunk) {
            const {node} = chunk;
            const {test} = node;
            
            if (isIdentifier(test))
                return use(chunk, test.name);
        },
        
        ForOfStatement(chunk) {
            const {node} = chunk;
            const {
                left,
                right,
            } = node;
            
            if (isIdentifier(right))
                use(chunk, right.name);
            
            if (isIdentifier(left))
                use(chunk, left.name);
            else
                chunk.get('left').traverse({
                    Identifier(leftPath) {
                        declare(chunk, leftPath.node.name);
                    },
                });
            
            chunk.get('left').traverse({
                Identifier(chunk) {
                    use(chunk, chunk.node.name);
                },
            });
        },
        
        ExpressionStatement(chunk) {
            const {node} = chunk;
            
            if (isIdentifier(node.expression))
                use(chunk, node.expression.name);
        },
        
        SwitchStatement(chunk) {
            const {node} = chunk;
            
            if (isIdentifier(node.discriminant))
                use(chunk, node.discriminant.name);
            
            for (const {test} of node.cases) {
                if (isIdentifier(test))
                    use(chunk, test.name);
            }
        },
        
        ReturnStatement(chunk) {
            const {node} = chunk;
            const {argument} = node;
            
            if (isIdentifier(argument))
                return use(chunk, argument.name);
        },
        
        ArrowFunctionExpression(chunk) {
            const paramsPaths = chunk.get('params');
            const {
                body,
                params,
            } = chunk.node;
            
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
                
                if (isAssignmentPattern(node)) {
                    declareAssign(paramPath.get('left'));
                    traverseAssign(paramPath.get('right'));
                    continue;
                }
            }
            
            if (isIdentifier(body))
                use(chunk, body.name);
            
            addParams({
                chunk,
                params,
            });
        },
        
        ObjectMethod(chunk) {
            const {params} = chunk.node;
            const paramsPaths = chunk.get('params');
            
            for (const paramPath of paramsPaths) {
                const {node} = paramPath;
                
                if (isIdentifier(node)) {
                    declare(paramPath, node.name);
                    continue;
                }
            }
            
            addParams({
                chunk,
                params,
            });
        },
        
        CallExpression(chunk) {
            const {node} = chunk;
            const {callee} = node;
            
            if (isIdentifier(callee))
                use(chunk, node.callee.name);
            
            const names = node.arguments.map(getName);
            chunk.traverse({
                SpreadElement(chunk) {
                    const {argument} = chunk.node;
                    
                    if (isIdentifier(argument))
                        use(chunk, argument.name);
                },
                Identifier(chunk) {
                    if (names.includes(chunk.node.name))
                        use(chunk, chunk.node.name);
                },
            });
        },
        
        BinaryExpression(chunk) {
            const {left, right} = chunk.node;
            
            if (isIdentifier(left))
                use(chunk, left.name);
            
            if (isIdentifier(right))
                use(chunk, right.name);
        },
        
        ImportDeclaration(chunk) {
            const specifierPaths = chunk.get('specifiers');
            
            for (const specPath of specifierPaths) {
                const {local} = specPath.node;
                
                if (isIdentifier(local))
                    declare(specPath, local.name);
            }
        },
        
        ExportDefaultDeclaration(chunk) {
            const declarationPath = chunk.get('declaration');
            const {declaration} = chunk.node;
            
            if (isFunctionDeclaration(declaration))
                use(chunk, declaration.id.name);
            else if (isIdentifier(declaration))
                use(chunk, declaration.name);
            else if (isClassDeclaration(declaration))
                use(chunk, declaration.id.name);
            else if (isObjectExpression(declaration))
                traverseObj(declarationPath.get('properties'));
        },
        
        ExportNamedDeclaration(chunk) {
            const {
                declaration,
                specifiers,
            } = chunk.node;
            
            if (isFunctionDeclaration(declaration))
                return use(chunk, declaration.id.name);
            
            if (isVariableDeclaration(declaration)) {
                const {declarations} = declaration;
                
                for (const {id} of declarations) {
                    if (isIdentifier(id))
                        use(chunk, id.name);
                }
                
                return;
            }
            
            for (const {local} of specifiers) {
                if (isIdentifier(local))
                    use(chunk, local.name);
            }
        },
        
        FunctionDeclaration(chunk) {
            const {node} = chunk;
            
            const {params} = node;
            const paramsPaths = chunk.get('params');
            
            declare(chunk, node.id.name);
            
            for (const paramPath of paramsPaths) {
                const {node} = paramPath;
                
                if (isIdentifier(node)) {
                    declare(paramPath, node.name);
                    continue;
                }
                
                if (isAssignmentPattern(node)) {
                    declareAssign(paramPath.get('left'));
                    traverseAssign(paramPath.get('right'));
                    continue;
                }
                
                if (isObjectPattern(node)) {
                    traverseObj(paramPath.get('properties'));
                    continue;
                }
            }
            
            addParams({
                chunk,
                params,
            });
        },
        
        JSXOpeningElement(chunk) {
            const {node} = chunk;
            const {name} = node;
            
            if (/^[A-Z]/.test(name.name))
                use(chunk, name.name);
            
            use(chunk, 'React');
        },
        
        JSXSpreadAttribute(chunk) {
            const argPath = chunk.get('argument');
            
            if (argPath.isIdentifier())
                return use(chunk, argPath.node.name);
        },
        
        JSXExpressionContainer(chunk) {
            const {node} = chunk;
            const {expression} = node;
            
            if (isIdentifier(expression))
                use(chunk, expression.name);
        },
    };
};

const removeArrayPatternElement = (elPath) => {
    const {remove} = elPath;
    
    return () => {
        const el = elPath.node;
        const arrayPattern = elPath.parentPath.node;
        const {elements} = arrayPattern;
        
        const n = elements.length - 1;
        const names = elements.map(getName);
        const i = names.indexOf(el.name);
        
        if (i === n)
            return remove.call(elPath);
        
        elements[i] = null;
    };
};

