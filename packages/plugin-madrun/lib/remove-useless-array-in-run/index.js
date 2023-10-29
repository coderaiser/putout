'use strict';

const {types} = require('putout');
const {isArrayExpression} = types;

module.exports.report = () => `Avoid useless array when pass arguments to 'run()'`;

module.exports.match = () => ({
    'run(__args)': ({__args}) => {
        if (__args.length !== 1)
            return false;
        
        const [first] = __args;
        
        if (!isArrayExpression(first))
            return false;
        
        if (first.elements.length !== 2)
            return false;
        
        return first.elements[1].value.includes(' ');
    },
});

module.exports.replace = () => ({
    'run(__args)': ({__args}, path) => {
        const [first] = __args;
        
        path.node.arguments = first.elements;
        
        return path;
    },
});
