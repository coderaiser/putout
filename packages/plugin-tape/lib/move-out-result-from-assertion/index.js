import {operator, types} from 'putout';

const {getBinding} = operator;

const {
    isIdentifier,
    isMemberExpression,
    isOptionalMemberExpression,
    isObjectExpression,
} = types;

export const report = () => `Move out result from assertion`;
export const match = () => ({
    't.__a(__b, __c)': ({__a, __b, __c}, path) => {
        if (!/equal/i.test(__a.name))
            return false;
        
        if (isMemberExpression(__b) && __b.property.name === 'callCount')
            return false;
        
        if (isMemberExpression(__b))
            return false;
        
        if (isOptionalMemberExpression(__b))
            return false;
        
        const resultBinding = getBinding(path, 'result');
        const expectedBinding = getBinding(path, 'expected');
        
        if (resultBinding && expectedBinding)
            return false;
        
        if (!resultBinding && !isIdentifier(__b))
            return true;
        
        if (expectedBinding)
            return false;
        
        return isObjectExpression(__c);
    },
});

export const replace = () => ({
    't.__(__a.__b(__args).__c)': `{
        const {__c} = __a.__b(__args);
        t.__(__c);
    }`,
    't.__(__a(__b))': `{
        const result = __a(__b);
        t.__(result);
    }`,
    't.__a(__b, __c)': ({__b, __c}, path) => {
        const resultBinding = getBinding(path, 'result');
        const expectedBinding = getBinding(path, 'expected');
        
        if (!resultBinding && !expectedBinding)
            return `{
                const result = __b;
                const expected= __c;
                
                t.__a(result, expected);
            }`;
        
        if (!expectedBinding && !isIdentifier(__c))
            return `{
                const expected = __c;
                
                t.__a(__b, expected);
            }`;
        
        if (!resultBinding && !isIdentifier(__b))
            return `{
                const result = __b;
                
                t.__a(result, __c);
            }`;
    },
});
