'use strict';

const {
    print,
    types,
} = require('putout');

const {
    isReturnStatement,
    isBlockStatement,
} = types;

const tail = (body) => body[body.length - 1];

module.exports.report = () => 'Use "for-of" instead of map when "return" absent';

module.exports.match = () => ({
    '__a.map((__b) => __c)': ({__c}, path) => {
        if (!path.parentPath.isExpressionStatement())
            return false;
        
        if (!isBlockStatement(__c))
            return false;
        
        if (isReturnStatement(tail(__c.body)))
            return false;
        
        return true;
    },
});

module.exports.replace = () => ({
    '__a.map((__b) => __c)': ({__a, __b}) => {
        const a = print(__a);
        const b = print(__b);
        
        return `for (const ${b} of ${a}) __c`;
    },
});

