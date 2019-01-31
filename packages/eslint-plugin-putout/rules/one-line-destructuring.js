/**
 * @fileoverview keep curly bracesin in one line when property is single
 * @author coderaiser
 */
'use strict';

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Keep curly braces on one line when you have one destructuring property',
            category: 'destructuring',
            recommended: true
        },
        fixable: 'whitespace', 
    },
    
    create(context) {
        return {
            VariableDeclarator(node) {
                const {id} = node;
                
                if (id.type !== 'ObjectPattern')
                    return;
                
                if (id.properties.length !== 1)
                    return;
                
                const text = context
                    .getSourceCode()
                    .getText(node);
                
                if (!text.includes('{\n'))
                    return;
                
                context.report({
                    node,
                    message: 'Keep curly braces on one line when you have one destructuring property',
                    
                    fix(fixer) {
                        const [property] = id.properties;
                        const {
                            key,
                            value,
                        } = property;
                        
                        const name = key === value ? key.name : `${key.name}: ${value.name}`;
                        
                        return [
                            fixer.replaceText(id, `{${name}}`)
                        ];
                    }
                });
            }
        };
    }
};

