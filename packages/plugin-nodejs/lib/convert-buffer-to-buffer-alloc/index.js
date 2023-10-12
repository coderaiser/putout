'use strict';

const {operator} = require('putout');
const {compute} = operator;

const isNumber = (a) => typeof a === 'number';

module.exports.report = () => `Use 'Buffer.alloc()' or 'Buffer.from()' instead of 'Buffer()' and 'new Buffer()'`;

module.exports.match = () => ({
    'new Buffer(__a)': (vars, path) => {
        const __aPath = path.get('arguments.0');
        const [is] = compute(__aPath);
        
        return is;
    },
});

module.exports.replace = () => ({
    'new Buffer(__a)': transform,
    'new Buffer(__a, __b)': transform,
    'Buffer(__a)': transform,
});

function transform({__b}, path) {
    const [, value] = compute(path.get('arguments.0'));
    
    if (isNumber(value))
        return 'Buffer.alloc(__a)';
    
    if (__b)
        return 'Buffer.from(__a, __b)';
    
    return 'Buffer.from(__a)';
}
