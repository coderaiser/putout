'use strict';

const {types, operator} = require('putout');
const {
    isExpressionStatement,
    isFunctionDeclaration,
    isBlockStatement,
} = types;

const {remove} = operator;

module.exports.report = () => `Unreachable code`;

module.exports.fix = ({siblings}) => {
    for (const sibling of siblings) {
        remove(sibling);
    }
};

const processBlock = (push, path, leaf) => {
    const siblings = path.getAllNextSiblings();
    
    if (!siblings.length)
        return;
    
    if (leaf) {
        const [first] = siblings;
        
        if (!path.node.argument && (isBlockStatement(first) || isExpressionStatement(first)))
            return false;
    }
    
    for (const sibling of siblings) {
        if (isFunctionDeclaration(sibling))
            continue;
        
        push({
            path: sibling,
            siblings: [sibling],
        });
    }
};

module.exports.traverse = ({push}) => ({
    'ReturnStatement|ThrowStatement'(path) {
        let leaf = true;
        
        while (path.parentPath?.isBlockStatement()) {
            processBlock(push, path, leaf);
            path = path.parentPath;
            leaf = false;
        }
    },
});
