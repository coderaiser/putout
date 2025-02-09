'use strict';

const {types, operator} = require('putout');
const {
    BinaryExpression,
    LogicalExpression,
    UnaryExpression,
    AssignmentExpression,
    isBinaryExpression,
    isUnaryExpression,
    isLogicalExpression,
} = types;

const {replaceWith, addParens} = operator;

module.exports.report = () => `SyntaxError: Invalid left-hand side in assignment expression`;

module.exports.fix = (path) => {
    const {
        left,
        right,
        operator,
    } = path.node;
    
    const logicalOperator = left.operator;
    const logicalLeft = left.left;
    
    if (isLogicalExpression(left)) {
        const logicalRight = AssignmentExpression(operator, left.right, right);
        
        replaceWith(path, LogicalExpression(
            logicalOperator,
            logicalLeft,
            logicalRight,
        ));
    } else if (isBinaryExpression(left)) {
        const logicalRight = AssignmentExpression(operator, left.right, right);
        
        replaceWith(path, BinaryExpression(
            logicalOperator,
            logicalLeft,
            logicalRight,
        ));
    } else if (isUnaryExpression(left)) {
        const logicalRight = AssignmentExpression(operator, left.argument, right);
        
        replaceWith(path, UnaryExpression(
            logicalOperator,
            logicalRight,
        ));
    }
    
    addParens(path);
};

module.exports.traverse = ({push}) => ({
    AssignmentExpression(path) {
        if (isLogicalExpression(path.node.left))
            push(path);
        
        if (isBinaryExpression(path.node.left))
            push(path);
        
        if (isUnaryExpression(path.node.left))
            push(path);
    },
});
