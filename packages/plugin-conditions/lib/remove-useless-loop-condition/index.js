'use strict';

const {operator} = require('putout');
const {
    getTemplateValues,
    compare,
} = operator;

const LOOP = 'while (__c = __d) __body';

module.exports.report = () => `Avoid useless loop condition`;

module.exports.match = () => ({
    'if (!__a) __b': ({__a}, path) => {
        const {parentPath} = path.parentPath;
        
        if (!compare(parentPath, LOOP))
            return false;
        
        const {__c} = getTemplateValues(parentPath, LOOP);
        
        return compare(__a, __c);
    },
});

module.exports.replace = () => ({
    'if (!__a) __b': '',
});
