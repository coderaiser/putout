'use strict';

const {types, operator} = require('putout');
const {remove} = operator;

const {
    isExpressionStatement,
    isFunctionDeclaration,
    isBlockStatement,
} = types;

const not = (fn) => (...a) => !fn(...a);

module.exports.report = () => `Avoid unreachable code`;

module.exports.fix = ({siblings}) => {
    siblings.map(remove);
};

module.exports.traverse = ({push}) => ({
    'ReturnStatement|ThrowStatement'(path) {
        let nextPath = path;
        
        while (nextPath.parentPath?.isBlockStatement()) {
            const siblings = nextPath
                .getAllNextSiblings()
                .filter(not(isFunctionDeclaration));
            
            const prevPath = nextPath;
            
            nextPath = nextPath.parentPath;
            
            if (!siblings.length)
                continue;
            
            const {argument} = path.node;
            
            if (checkFirstSibling({argument, siblings}))
                continue;
            
            push({
                path: prevPath,
                siblings,
            });
        }
    },
});

function checkFirstSibling({argument, siblings}) {
    if (argument)
        return false;
    
    const [first] = siblings;
    
    if (isBlockStatement(first))
        return true;
    
    return isExpressionStatement(first);
}
