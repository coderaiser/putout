'use strict';

const {types} = require('putout');
const {isIdentifier} = types;

module.exports.report = () => `Split call with destructuring`;

module.exports.replace = () => ({
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
