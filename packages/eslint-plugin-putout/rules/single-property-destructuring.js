'use strict';

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Keep curly braces on one line when you have one destructuring property',
            category: 'destructuring',
            recommended: true,
        },
        fixable: 'whitespace',
    },
    
    create(context) {
        return {
            'VariableDeclarator[id.type="ObjectPattern"][id.properties.length=1]': (node) => {
                const {id} = node;
                
                const text = context
                    .getSourceCode()
                    .getText(node.parent);
                
                if (!/(const|let|var) \{\n/.test(text))
                    return;
                
                debugger;
                const assignRegExp = /\{\n?.*=.*\n?.*}/;
                
                if (assignRegExp.test(text))
                    return;
                
                context.report({
                    node,
                    message: 'Keep curly braces on one line when you have one destructuring property',
                    
                    fix(fixer) {
                        const [property] = id.properties;
                        const {key, value} = property;
                        
                        if (key.name === value.name)
                            return [
                                fixer.replaceText(id, `{${key.name}}`),
                            ];
                        
                        return [
                            fixer.replaceText(id, `{${key.name}: ${value.name}}`),
                        ];
                    },
                });
            },
        };
    },
};

