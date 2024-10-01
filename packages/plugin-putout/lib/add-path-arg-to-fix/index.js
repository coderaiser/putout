'use strict';

module.exports.report = () => `Add 'path' argument to 'fix'`;

module.exports.match = () => ({
    'const fix = () => __a': ({__a}) => __a.body.length > 0,
});

module.exports.replace = () => ({
    'const fix = () => __a': 'const fix = (path) => __a',
    'module.exports.fix = () => __body': 'module.exports.fix = (path) => __body',
});
