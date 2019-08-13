'use strict';

const description = 'Keep all properties in one line when using destructuring in for-of';

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description,
            category: 'destructuring',
            recommended: true,
        },
        fixable: 'whitespace',
    },
    
    create(context) {
        const {maxProperties = 8} = context.options[0] || {};
        
        return {
            [`VariableDeclarator[id.type="ObjectPattern"][id.properties.length<${maxProperties}]`]: (node) => {
                if (node.parent.parent.type !== 'ForOfStatement')
                    return;
                
                const text = context
                    .getSourceCode()
                    .getText(node);
                
                if (!text.includes('\n'))
                    return;
                
                context.report({
                    node,
                    message: description,
                    
                    fix(fixer) {
                        const fixed = text
                            .replace(/\n/g, '')
                            .replace(/,/g, ', ')
                            .replace(/{\s*/g, '{')
                            .replace(/\s*}/g, '}');
                        
                        return [
                            fixer.replaceText(node, fixed),
                        ];
                    },
                });
            },
        };
    },
};

