'use strict';

const {
    isOptionalMemberExpression,
    isMemberExpression,
    isIdentifier,
    isLiteral,
} = require('@babel/types');

module.exports.isSimple = (a) => {
    if (isLiteral(a))
        return true;
    
    if (isIdentifier(a))
        return true;
    
    if (isMemberExpression(a))
        return true;
    
    return isOptionalMemberExpression(a);
};
