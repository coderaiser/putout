'use strict';

const {types} = require('putout');
const {
    isReturnStatement,
    isBlockStatement,
    isTryStatement,
} = types;

const tail = (body) => body.at(-1);

module.exports.report = () => `Use 'for...of' instead of map when 'return' absent`;

module.exports.match = () => ({
    '__a.map((__b) => __c)': ({__c}, path) => {
        if (!path.parentPath.isExpressionStatement())
            return false;
        
        if (!isBlockStatement(__c))
            return false;
        
        const last = tail(__c.body);
        
        if (isTryStatement(last))
            return false;
        
        return !isReturnStatement(last);
    },
});

module.exports.replace = () => ({
    '__a.map((__b) => __c)': (vars, path) => {
        const a = path.get('callee.object');
        const b = path.get('arguments.0.params.0');
        
        return `for (const ${b} of ${a}) __c`;
    },
});
