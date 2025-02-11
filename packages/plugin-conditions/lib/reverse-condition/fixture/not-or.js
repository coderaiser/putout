 module.exports.filter = ({parentPath}) => !(isBinaryExpression(parentPath) || isTemplateLiteral(parentPath.parentPath));
