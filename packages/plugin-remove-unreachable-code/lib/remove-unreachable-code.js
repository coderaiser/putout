'use strict';

const {types, operator} = require('putout');
const {remove} = operator;

const {
    isExpressionStatement,
    isFunctionDeclaration,
    isBlockStatement,
} = types;

const not = (fn) => (...a) => !fn(...a);

module.exports.report = () => `Unreachable code`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    'ReturnStatement|ThrowStatement'(path) {
        while (path.parentPath?.isBlockStatement()) {
            const siblings = path.getAllNextSiblings();
            const {argument} = path.node;
            
            path = path.parentPath;
            
            if (checkFirstSibling({argument, siblings}))
                continue;
            
            processSiblings({
                push,
                siblings,
            });
        }
    },
});

const processSiblings = ({push, siblings}) => {
    if (!siblings.length)
        return;
    
    siblings
        .filter(not(isFunctionDeclaration))
        .map(push);
};

function checkFirstSibling({argument, siblings}) {
    if (argument)
        return false;
    
    const [first] = siblings;
    
    if (isBlockStatement(first))
        return true;
    
    return isExpressionStatement(first);
}
