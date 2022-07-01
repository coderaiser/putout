'use strict';

module.exports.report = ({leftPath, rightPath}) => {
    return `Swap '${leftPath.toString()}' with '${rightPath}'`;
};

const {replaceWith} = require('putout').operator;

module.exports.fix = ({leftPath, rightPath}) => {
    const leftNode = leftPath.node;
    const rightNode = rightPath.node;
    
    replaceWith(rightPath, leftNode);
    replaceWith(leftPath, rightNode);
};

module.exports.traverse = ({push}) => ({
    BinaryExpression: (path) => {
        const {operator} = path.node;
        
        if (!/^[<>]=?|===?$/.test(operator))
            return;
        
        const leftPath = path.get('left');
        const rightPath = path.get('right');
        
        if (!isLeftValid(leftPath))
            return;
        
        if (!rightPath.isIdentifier() && !rightPath.isMemberExpression() && !rightPath.isCallExpression())
            return;
        
        push({
            path,
            leftPath,
            rightPath,
        });
    },
});

function isLeftValid(leftPath) {
    if (leftPath.isIdentifier() || leftPath.isMemberExpression() || leftPath.isCallExpression())
        return false;
    
    if (leftPath.isOptionalMemberExpression())
        return false;
    
    return true;
}
