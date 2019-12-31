'use strict';

const alignSpaces = require('align-spaces');

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Spaces should be aligned on empty lines',
            category: 'spaces',
            recommended: true,
        },
        fixable: 'whitespace',
    },
    
    create(context) {
        return {
            Program(node) {
                const text = context
                    .getSourceCode()
                    .getText(node);
                
                const aligned = alignSpaces(text);
                
                if (text === aligned)
                    return;
                
                context.report({
                    node,
                    message: 'Spaces should be aligned on empty lines',
                    
                    fix(fixer) {
                        return [
                            fixer.replaceText(node, aligned),
                        ];
                    },
                });
            },
        };
    },
};

