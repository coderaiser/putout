'use strict';

const {isObjectPattern} = require('putout').types;

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Remove newline between declarations',
            category: 'putout',
            recommended: true,
        },
        fixable: 'code',
    },
    
    create(context) {
        return {
            VariableDeclaration(node) {
                const source = context.getSourceCode();
                const text = source.getText(node);
                const newline = source.getText(node, 0, 2).replace(text, '');
                
                if (newline !== '\n\n')
                    return;
                
                const nextNode = context.getNodeByRangeIndex(node.range[1] + 2);
                
                if (!nextNode || nextNode.type !== 'VariableDeclaration')
                    return;
                
                const nodeId = node.declarations[0].id;
                
                if (!isObjectPattern(nodeId))
                    return;
                
                if (nodeId.properties.length !== 1)
                    return;
                
                const textId = source.getText(nodeId.properties[0].value);
                
                const nextNodeInit = nextNode.declarations[0].init;
                const nextTextInit = source.getText(nextNodeInit);
                
                if (textId !== nextTextInit)
                    return;
                
                context.report({
                    node,
                    message: 'Remove empty newline between declarations',
                    
                    fix(fixer) {
                        return [
                            fixer.removeRange([node.range[1], node.range[1] + 1]),
                        ];
                    },
                });
            },
        };
    },
};
