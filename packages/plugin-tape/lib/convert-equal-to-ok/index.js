'use strict';

const {operator, types} = require('putout');

const isBool = (a) => typeof a === 'boolean';
const {compute} = operator;
const {isBooleanLiteral} = types;

module.exports.report = (path) => {
    const arg = path.get('arguments.0');
    return `Use 't.ok(${arg})' instead of '${path}'`;
};

module.exports.match = () => ({
    't.equal(__a, __b)': ({__b}, path) => {
        if (isBooleanLiteral(__b, {value: true}))
            return true;
        
        const [is, value] = compute(path.get('arguments.1'));
        
        if (!is)
            return false;
        
        return isBool(value) && value;
    },
});

module.exports.replace = () => ({
    't.equal(__a, __b)': 't.ok(__a)',
    't.equal(__a, true, __b)': 't.ok(__a, __b)',
    't.deepEqual(__a, true)': 't.ok(__a)',
    't.deepEqual(__a, true, __b)': 't.ok(__a, __b)',
});
