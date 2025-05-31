module.exports.report = ({leftPath, rightPath}) => {
    return `Swap`;
};

const {replaceWith} = require('putout').operator;

module.exports.fix = ({path, leftPath, rightPath, operator}) => {
    const rightNode = rightPath.node;
    
    replaceWith(leftPath, rightNode);
};
