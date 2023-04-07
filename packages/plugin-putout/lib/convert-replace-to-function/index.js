'use strict';

module.exports.report = () => `'replace' should be a function`;

module.exports.replace = () => ({
    'module.exports.replace = __object': 'module.exports.replace = () => __object',
});
