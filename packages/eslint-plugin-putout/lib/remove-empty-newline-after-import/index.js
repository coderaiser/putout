'use strict';

const {isBuiltIn} = require('./is-built-in');
const isLocal = (a) => /^\./.test(a.source.value);
const isNode = (a) => isBuiltIn(a.source.value);

const isSameGroup = (a, b) => {
    if (isLocal(a) && isLocal(b))
        return true;
    
    if (isNode(a) && isNode(b))
        return true;
    
    return false;
};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Putout',
            category: 'putout',
            recommended: true,
        },
        fixable: 'code',
    },
    
    create(context) {
        return {
            ImportDeclaration(node) {
                const source = context.getSourceCode();
                const text = source.getText(node);
                const newline = source.getText(node, 0, 2).replace(text, '');
                
                if (node.specifiers.length > 1)
                    return;
                
                if (newline !== '\n\n')
                    return;
                
                const nextNode = context.getNodeByRangeIndex(node.range[1] + 2);
                
                if (!nextNode || nextNode.type !== 'ImportDeclaration')
                    return;
                
                if (nextNode.specifiers.length > 1)
                    return;
                
                const allImports = getImports(node.parent);
                
                if (!isSameGroup(node, nextNode) && allImports.length > 2)
                    return;
                
                context.report({
                    node,
                    message: 'Remove empty newline after import',
                    
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

function getImports(node) {
    const imports = [];
    for (const current of node.body) {
        if (current.type === 'ImportDeclaration')
            imports.push(current);
    }
    
    return imports;
}
