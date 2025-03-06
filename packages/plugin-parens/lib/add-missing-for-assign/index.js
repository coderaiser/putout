'use strict';

const {types, operator} = require('putout');
const {
    unaryExpression,
    binaryExpression,
    logicalExpression,
    isBinaryExpression,
    isUnaryExpression,
    isLogicalExpression,
    assignmentExpression,
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
        const logicalRight = assignmentExpression(operator, left.right, right);
        
        replaceWith(path, logicalExpression(
            logicalOperator,
            logicalLeft,
            logicalRight,
        ));
    } else if (isBinaryExpression(left)) {
        const logicalRight = assignmentExpression(operator, left.right, right);
        
        replaceWith(path, binaryExpression(
            logicalOperator,
            logicalLeft,
            logicalRight,
        ));
    } else if (isUnaryExpression(left)) {
        const logicalRight = assignmentExpression(operator, left.argument, right);
        
        replaceWith(path, unaryExpression(
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
