'use strict';

const {types, operator} = require('putout');
const {remove, replaceWith} = operator;
const {YieldExpression} = types;

module.exports.report = () => `Add missing '*' in generator function`;

module.exports.fix = (path) => {
    const fnPath = path.getFunctionParent();
    
    fnPath.node.generator = true;
    
    const next = path.parentPath.getNextSibling();
    const {expression} = next.node;
    
    replaceWith(path, YieldExpression(expression));
    remove(next);
};

module.exports.traverse = ({push}) => ({
    Identifier(path) {
        if (path.node.name !== 'yield')
            return;
        
        if (!path.parentPath.isExpressionStatement())
            return;
        
        push(path);
    },
});
