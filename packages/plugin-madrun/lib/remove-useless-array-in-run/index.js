'use strict';

const {types} = require('putout');
const {
    isArrayExpression,
    isStringLiteral,
} = types;

module.exports.report = () => `Avoid useless array when pass arguments to 'run()'`;

module.exports.match = () => ({
    'run(__args)': ({__args}) => {
        if (__args.length !== 1)
            return false;
        
        const [array] = __args;
        
        if (!isArrayExpression(array))
            return false;
        
        if (array.elements.length !== 2)
            return false;
        
        const [, second] = array.elements;
        
        if (isStringLiteral(second))
            return second.value.includes(' ');
        
        return false;
    },
});

module.exports.replace = () => ({
    'run(__args)': ({__args}, path) => {
        const {elements} = __args[0];
        
        path.node.arguments = elements;
        
        return path;
    },
});
