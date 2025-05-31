const {replaceWith} = require('putout').operator;

module.exports.fix = ({path, leftPath, rightPath, operator}) => {
    const leftNode = leftPath.node;
    const rightNode = rightPath.node;
    
    replaceWith(rightPath, leftNode);
};

