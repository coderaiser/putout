'use strict';

const {
    types,
    operate,
} = require('putout');

const {
    ifStatement,
    ExpressionStatement,
    UnaryExpression,
} = types;

const {replaceWith} = operate;

module.exports.report = () => 'Should be used if statement instead of logical expression';

module.exports.traverse = ({push}) => {
    return {
        LogicalExpression(path) {
            if (!path.parentPath.isExpressionStatement())
                return;
            
            if (path.get('left').isLogicalExpression())
                return;
            
            push(path);
        },
    };
};

module.exports.fix = (path) => {
    const {
        parentPath,
        node,
    } = path;
    
    const {operator} = node;
    
    if (operator === '&&') {
        const ifNode = ifStatement(path.node.left, ExpressionStatement(path.node.right));
        return replaceWith(parentPath, ifNode);
    }
    
    if (operator === '||') {
        const ifNode = ifStatement(UnaryExpression('!', path.node.left), ExpressionStatement(path.node.right));
        return replaceWith(parentPath, ifNode);
    }
};

