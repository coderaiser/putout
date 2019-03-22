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

module.exports = ({use, declare, addParams}) => {
    const traverseObj = traverseObjectExpression(use);
    const declareObj = traverseObjectExpression(declare);
    
    const traverseAssign = traverseAssignmentExpression(use);
    const declareAssign = traverseAssignmentExpression(declare);
    
    const traverseTmpl = traverseTemplateLiteral(use);
    const traverseArray = traverseArrayExpression(use);
    
    return {
        ObjectExpression(path) {
            traverseObj(path.get('properties'));
        },
        
        SpreadElement(path) {
            const {argument} = path.node;
            
            if (isIdentifier(argument))
                use(path, argument.name);
        },
        
        RestElement(path) {
            const {argument} = path.node;
            
            if (isIdentifier(argument))
                declare(path, argument.name);
        },
        
        VariableDeclarator(path) {
            const {node} = path;
            const {init} = node;
            const idPath = path.get('id');
            
            if (isIdentifier(node.id)) {
                declare(path, node.id.name);
            } else if (isObjectPattern(node.id)) {
                idPath.traverse({
                    ObjectProperty(propPath) {
                        if (isAssignmentPattern(propPath.node.value)) {
                            traverseAssign(propPath.get('value.right'));
                            declareAssign(propPath.get('value.left'));
                            return;
                        }
                        
                        if (!isIdentifier(propPath.node.value))
                            return;
                        
                        const {properties} = node.id;
                        const isOne = properties.length === 1;
                        const nodePath = isOne ? path : propPath;
                        
                        declare(nodePath, propPath.node.value.name);
                    },
                });
            } else if (isArrayPattern(node.id)) {
                idPath.traverse({
                    Identifier(elPath) {
                        const {elements} = node.id;
                        
                        if (elements.length === 1)
                            return declare(path, elPath.node.name);
                        
                        assign(elPath, {
                            remove: removeArrayPatternElement(elPath),
                        });
                        
                        declare(elPath, elPath.node.name);
                    },
                });
            }
            
            const initPath = path.get('init');
            
            if (isIdentifier(init))
                use(path, init.name);
            else if (isArrayExpression(init))
                traverseArray(initPath.get('elements'));
        },
        
        ClassDeclaration(path) {
            const {node} = path;
            const {
                id,
                superClass,
            } = node;
            
            if (superClass)
                use(path, superClass.name);
            
            declare(path, id.name);
        },
        
        AssignmentExpression(path) {
            traverseAssign(path.get('left'));
            traverseAssign(path.get('right'));
        },
        
        ArrayExpression(path) {
            const {elements} = path.node;
            
            for (const el of elements) {
                if (isIdentifier(el)) {
                    use(path, el.name);
                    continue;
                }
                
                if (isSpreadElement(el)) {
                    use(path, el.argument.name);
                    continue;
                }
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
        
        TemplateLiteral(path) {
            traverseTmpl(path, path.node.expressions);
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
            
            if (isIdentifier(object))
                use(path, object.name);
            
            if (computed && isIdentifier(property))
                use(path, property.name);
        },
        
        NewExpression(path) {
            const {node} = path;
            
            if (isIdentifier(node.callee))
                use(path, node.callee.name);
            
            const argPaths = path.get('arguments');
            
            for (const argPath of argPaths) {
                const {node} = argPath;
                
                if (isIdentifier(node)) {
                    use(path, node.name);
                    continue;
                }
            }
        },
        
        TaggedTemplateExpression(path) {
            const {tag} = path.node;
            
            if (isIdentifier(tag))
                use(path, tag.name);
        },
        
        UnaryExpression(path) {
            const {argument} = path.node;
            
            if (isIdentifier(argument))
                use(path, argument.name);
        },
        
        UpdateExpression(path) {
            const {argument} = path.node;
            
            if (isIdentifier(argument))
                use(path, argument.name);
        },
        
        ThrowStatement(path) {
            const {argument} = path.node;
            
            if (isIdentifier(argument))
                use(path, argument.name);
        },
        
        IfStatement(path) {
            const {node} = path;
            const {test} = node;
            
            if (isIdentifier(test))
                return use(path, test.name);
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
                    },
                });
            
            path.get('left').traverse({
                Identifier(path) {
                    use(path, path.node.name);
                },
            });
        },
        
        ExpressionStatement(path) {
            const {node} = path;
            
            if (isIdentifier(node.expression))
                use(path, node.expression.name);
        },
        
        SwitchStatement(path) {
            const {node} = path;
            
            if (isIdentifier(node.discriminant))
                use(path, node.discriminant.name);
            
            for (const {test} of node.cases) {
                if (isIdentifier(test))
                    use(path, test.name);
            }
        },
        
        ReturnStatement(path) {
            const {node} = path;
            const {argument} = node;
            
            if (isIdentifier(argument))
                return use(path, argument.name);
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
                
                if (isAssignmentPattern(node)) {
                    declareAssign(paramPath.get('left'));
                    traverseAssign(paramPath.get('right'));
                    continue;
                }
            }
            
            if (isIdentifier(body))
                use(path, body.name);
            
            addParams({
                path,
                params,
            });
        },
        
        ObjectMethod(path) {
            const paramsPaths = path.get('params');
            
            for (const paramPath of paramsPaths) {
                const {node} = paramPath;
                if (isIdentifier(node)) {
                    declare(paramPath, node.name);
                    continue;
                }
            }
        },
        
        CallExpression(path) {
            const {node} = path;
            const {callee} = node;
            
            if (isIdentifier(callee))
                use(path, node.callee.name);
            
            path.traverse({
                SpreadElement(path) {
                    const {argument} = path.node;
                    
                    if (isIdentifier(argument))
                        use(path, argument.name);
                },
                Identifier(path) {
                    if (node.arguments.includes(path.node))
                        use(path, path.node.name);
                },
            });
        },
        
        BinaryExpression(path) {
            const {left, right} = path.node;
            
            if (isIdentifier(left))
                use(path, left.name);
            
            if (isIdentifier(right))
                use(path, right.name);
        },
        
        ExportDefaultDeclaration(path) {
            const declarationPath = path.get('declaration');
            const {declaration} = path.node;
            
            if (isFunctionDeclaration(declaration))
                use(path, declaration.id.name);
            else if (isIdentifier(declaration))
                use(path, declaration.name);
            else if (isClassDeclaration(declaration))
                use(path, declaration.id.name);
            else if (isObjectExpression(declaration))
                traverseObj(declarationPath.get('properties'));
        },
        
        ExportNamedDeclaration(path) {
            const {
                declaration,
                specifiers,
            } = path.node;
            
            if (isFunctionDeclaration(declaration))
                return use(path, declaration.id.name);
            
            if (isVariableDeclaration(declaration)) {
                const {declarations} = declaration;
                
                for (const {id} of declarations) {
                    if (isIdentifier(id))
                        use(path, id.name);
                }
                
                return;
            }
            
            for (const {local} of specifiers) {
                if (isIdentifier(local))
                    use(path, local.name);
            }
        },
        
        FunctionDeclaration(path) {
            const {node} = path;
            
            const {params} = node;
            const paramsPaths = path.get('params');
            
            declare(path, node.id.name);
            
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
                path,
                params,
            });
        },
        
        JSXOpeningElement(path) {
            const {node} = path;
            const {name} = node;
            
            if (/^[A-Z]/.test(name.name))
                use(path, name.name);
            
            use(path, 'React');
        },
        
        JSXSpreadAttribute(path) {
            const argPath = path.get('argument');
            
            if (argPath.isIdentifier())
                return use(path, argPath.node.name);
        },
        
        JSXExpressionContainer(path) {
            const {node} = path;
            const {expression} = node;
            
            if (isIdentifier(expression))
                use(path, expression.name);
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
        const i = elements.indexOf(el);
        
        if (i === n)
            return remove.call(elPath);
        
        elements[i] = null;
    };
};

