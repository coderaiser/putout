'use strict';

const {types} = require('putout');
const {isSpreadElement} = types;

module.exports.report = () => 'Array constructor should be avoided';

module.exports.match = () => ({
    'Array(__args)': ({__args}) => {
        const [first] = __args;
        
        if (isSpreadElement(first))
            return true;
        
        return __args.length > 1;
    },
});

module.exports.replace = () => ({
    'Array(...__a)': '[__a]',
    'Array.of(__args)': '[__args]',
    'Array(__args)': '[__args]',
    'new Array(__args)': ({__args}, path) => {
        path.node.type = 'CallExpression';
        
        if (__args.length === 1)
            return path;
        
        return '[__args]';
    },
});

