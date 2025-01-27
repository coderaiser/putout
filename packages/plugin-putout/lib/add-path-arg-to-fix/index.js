'use strict';

const check = ({__a}) => __a.body.length > 0;

module.exports.report = () => `Add 'path' argument to 'fix'`;

module.exports.match = () => ({
    'const fix = () => __a': check,
    'module.exports.fix = () => __a': check,
});

module.exports.replace = () => ({
    'const fix = () => __a': 'const fix = (path) => __a',
    'module.exports.fix = () => __a': 'module.exports.fix = (path) => __a',
});
