'use strict';

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Add new line before and after arguments in a function call',
            category: 'CallExpression',
            recommended: true,
        },
        fixable: 'whitespace',
    },
    
    create(context) {
        return {
            CallExpression(node) {
                if (node.callee.type !== 'Identifier')
                    return;
                
                const {name} = node.callee;
                const source = context.getSourceCode();
                
                if (node.arguments.length < 3)
                    return;
                
                for (const arg of node.arguments) {
                    if (/Function|Object|Array/.test(arg.type))
                        return;
                }
                
                const text = source
                    .getText(node)
                    .replace(name, '');
                
                if (text.length < 60)
                    return;
                
                const isOpenBracket = /^\(\n/.test(text);
                const isCloseBracket = /\n\s*\)$/.test(text);
                
                if (isOpenBracket && isCloseBracket)
                    return;
                
                context.report({
                    node,
                    message: 'Add new line before and after arguments in a function call',
                    
                    fix(fixer) {
                        const fixed = name + text
                            .replace('(', '(\n')
                            .replace(/\)$/, '\n)');
                        
                        return [
                            fixer.replaceText(node, fixed),
                        ];
                    },
                });
            },
        };
    },
};

