'use strict';

module.exports.report = () => `Add 'path' argument to 'fix'`;

module.exports.replace = () => ({
    'const fix = () => __a': 'const fix = (path) => __a',
    'module.exports.fix = () => {}': 'module.exports.fix = (path) => {}',
});
