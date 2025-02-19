'use strict';

const {operator} = require('putout');
const {compare} = operator;
const check = ({__a}) => {
    if (__a.body)
        return __a.body.length > 0;
    
    return compare(__a, 'path.__()');
};

module.exports.report = () => `Add 'path' argument to 'fix'`;

module.exports.match = () => ({
    'const fix = () => __a': check,
    'module.exports.fix = () => __a': check,
});

module.exports.replace = () => ({
    'const fix = () => __a': 'const fix = (path) => __a',
    'module.exports.fix = () => __a': 'module.exports.fix = (path) => __a',
});
