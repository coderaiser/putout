'use strict';

module.exports.report = ({leftPath, rightPath}) => {
    return `Swap '${leftPath.toString()}' with '${rightPath}'`;
};

const {replaceWith} = require('putout').operator;

module.exports.fix = ({path, leftPath, rightPath, operator}) => {
    const leftNode = leftPath.node;
    const rightNode = rightPath.node;
    
    replaceWith(rightPath, leftNode);
    replaceWith(leftPath, rightNode);
    
    path.node.operator = convertOperator(operator);
};

module.exports.traverse = ({push}) => ({
    BinaryExpression: (path) => {
        const {operator} = path.node;
        
        if (!/^[<>]=?|===?$/.test(operator))
            return;
        
        if (operator.includes('>>') || operator.includes('<<'))
            return;
        
        const leftPath = path.get('left');
        const rightPath = path.get('right');
        
        if (leftPath.isUpdateExpression())
            return;
        
        if (!isLeftValid(leftPath))
            return;
        
        if (!rightPath.isIdentifier() && !rightPath.isMemberExpression() && !rightPath.isCallExpression())
            return;
        
        push({
            path,
            operator,
            leftPath,
            rightPath,
        });
    },
});

function isLeftValid(leftPath) {
    if (leftPath.isIdentifier() || leftPath.isMemberExpression() || leftPath.isCallExpression())
        return false;
    
    return !leftPath.isOptionalMemberExpression();
}

function convertOperator(operator) {
    if (operator.includes('>'))
        return operator.replace('>', '<');
    
    if (operator.includes('<'))
        return operator.replace('<', '>');
    
    return operator;
}
