'use strict';

const {isCorrectLoc} = require('./common');

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
        const {minProperties = 2} = context.options[0] || {};
        
        return {
            [`VariableDeclarator[id.type="ObjectPattern"][id.properties.length>${minProperties}]`]: (node) => {
                if (node.parent.parent.type === 'ForOfStatement')
                    return;
                
                const {id} = node;
                const {properties} = id;
                const {line} = node.loc.start;
                const isLoc = isCorrectLoc(line, properties);
                
                if (isLoc)
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
                            .replace('}', '\n}')
                            .replace(/\n(\s*)?\n/g, '\n');
                        
                        return [
                            fixer.replaceText(node, fixed),
                        ];
                    },
                });
            },
        };
    },
};

