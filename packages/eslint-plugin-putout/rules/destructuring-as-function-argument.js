'use strict';

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Keep curly braces on one line when you use destructuring as function argument',
            category: 'destructuring',
            recommended: true,
        },
        fixable: 'whitespace',
    },
    
    create(context) {
        return {
            ':has(ArrowFunctionExpression, FunctionExpression, FunctionDeclaration) > .params[type=ObjectPattern]'(node) {
                const text = context
                    .getSourceCode()
                    .getText(node);
                
                if (!/\n/.test(text))
                    return;
                
                context.report({
                    node,
                    message: 'Keep curly braces on one line when you use destructuring as function argument',
                    
                    fix(fixer) {
                        const fixed =text
                            .replace(/\n/g, '')
                            .replace(/ /g, '')
                            .replace(/,/g, ', ')
                            .replace(', }', '}');
                        
                        return [
                            fixer.replaceText(node, fixed),
                        ];
                    },
                });
            },
        };
    },
};

