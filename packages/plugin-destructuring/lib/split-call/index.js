import {types} from 'putout';

const {isIdentifier} = types;

export const report = () => `Split call with destructuring`;

export const replace = () => ({
    '__a(__args)({__c} = __d)': `{
        __a(__args);
        ({__c} = __d);
    }`,
    '__a(__args)[__c] = __d': ({__c}) => {
        if (isIdentifier(__c))
            return `{
                __a(__args);
                [__c] = __d;
            }`;
        
        __c.elements = __c.expressions;
        __c.type = 'ArrayPattern';
        delete __c.expressions;
        
        return `{
            __a(__args);
            __c = __d;
        }`;
    },
});
