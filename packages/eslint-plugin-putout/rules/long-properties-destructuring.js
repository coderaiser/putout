'use strict';

const {isCorrectLoc} = require('./common');

const description = 'Keep each property on separate lines when destructuring long properties';

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
            'VariableDeclarator[id.type="ObjectPattern"][id.properties.length>=2]': (node) => {
                const {id} = node;
                const {properties} = id;
                const {line} = node.loc.start;
                const isLoc = isCorrectLoc(line, properties);
                const isLength = isCorrectLength(properties);
                
                if (isLoc || isLength)
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

function isCorrectLength(properties) {
    for (const prop of properties) {
        const {name} = prop.key || prop.argument;
        
        if (name.length >= 10)
            return false;
    }
    
    return true;
}

