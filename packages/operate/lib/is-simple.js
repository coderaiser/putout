'use strict';

const {types} = require('@putout/babel');
const {
    isOptionalMemberExpression,
    isMemberExpression,
    isIdentifier,
    isLiteral,
} = types;

module.exports.isSimple = (a) => {
    if (isLiteral(a))
        return true;
    
    if (isIdentifier(a))
        return true;
    
    if (isMemberExpression(a))
        return true;
    
    return isOptionalMemberExpression(a);
};
