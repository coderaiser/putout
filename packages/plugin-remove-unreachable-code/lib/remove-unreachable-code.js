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

module.exports.traverse = ({push}) => ({
    'ReturnStatement|ThrowStatement'(path) {
        const siblings = path.getAllNextSiblings();
        
        if (!siblings.length)
            return;
        
        const [first] = siblings;
        
        if (!path.node.argument && (isBlockStatement(first) || isExpressionStatement(first)))
            return false;
        
        if (siblings.find(isFunctionDeclaration))
            return;
        
        push({
            path: siblings[0],
            siblings,
        });
    },
});
