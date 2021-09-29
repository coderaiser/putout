'use strict';

const {types} = require('putout');

const {isLiteral} = types;

module.exports.report = (path) => {
    const args = path.get('arguments');
    
    if (args.length === 2)
        return `Use 't.equal(${args[0]}, ${args[1]})' instead of '${path}' when comparing with primitive`;
    
    return `Use 't.equal(${args[0]}, ${args[1]}, ${args[2]})' instead of '${path} when comparin with primitive'`;
};

const check = ({__b}) => isLiteral(__b);

module.exports.match = () => ({
    't.deepEqual(__a, __b)': check,
    't.deepEqual(__a, __b, __c)': check,
});

module.exports.replace = () => ({
    't.deepEqual(__a, __b)': 't.equal(__a, __b)',
    't.deepEqual(__a, __b, __c)': 't.equal(__a, __b, __c)',
});

