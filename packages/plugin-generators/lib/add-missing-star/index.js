'use strict';

const {types, operator} = require('putout');
const {remove, replaceWith} = operator;
const {YieldExpression} = types;

const DELEGATE = true;

module.exports.report = () => `Add missing '*' in generator function`;

module.exports.fix = (path) => {
    const fnPath = path.getFunctionParent();
    
    fnPath.node.generator = true;
    
    if (path.parentPath.isExpressionStatement()) {
        const next = path.parentPath.getNextSibling();
        const {expression} = next.node;
        
        replaceWith(path, YieldExpression(expression));
        remove(next);
        
        return;
    }
    
    const {parentPath} = path;
    const {right} = parentPath.node;
    
    replaceWith(parentPath, YieldExpression(right, DELEGATE));
};

module.exports.traverse = ({push}) => ({
    Identifier(path) {
        if (path.node.name !== 'yield')
            return;
        
        if (path.parentPath.isBinaryExpression({operator: '*'})) {
            push(path);
            return;
        }
        
        if (!path.parentPath.isExpressionStatement())
            return;
        
        push(path);
    },
});
