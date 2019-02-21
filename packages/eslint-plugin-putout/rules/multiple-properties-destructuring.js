'use strict';

const description = 'Keep each property on separate lines when using multiple destructuring properties';

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
        return {
            'VariableDeclarator[id.type="ObjectPattern"][id.properties.length>1]': (node) => {
                const {id} = node;
                const {properties} = id;
                const {line} = node.loc.start;
                const is = isCorrectLoc(line, properties);
                
                if (is)
                    return;
                
                const text = context
                    .getSourceCode()
                    .getText(node);
                
                context.report({
                    node,
                    message: description,
                    
                    fix(fixer) {
                        const fixed = text
                            .replace(/,/g, ',\n')
                            .replace('{', '{\n')
                            .replace('}', '\n}');
                        
                        return [
                            fixer.replaceText(node, fixed),
                        ];
                    },
                });
            },
        };
    },
};

function isCorrectLoc(line, properties) {
    const n = properties.length;
    
    for (let i = 0; i < n; i++) {
        const prop = properties[i];
        
        if (prop.loc.start.line != i + line + 1)
            return false;
    }
    
    return true;
}

