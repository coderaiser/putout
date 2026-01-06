import {types} from '@putout/babel';

const {
    isOptionalMemberExpression,
    isMemberExpression,
    isIdentifier,
    isLiteral,
} = types;

export const isSimple = (a) => {
    if (isLiteral(a))
        return true;
    
    if (isIdentifier(a))
        return true;
    
    if (isMemberExpression(a))
        return true;
    
    return isOptionalMemberExpression(a);
};
