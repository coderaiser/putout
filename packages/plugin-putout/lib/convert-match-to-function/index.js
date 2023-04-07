'use strict';

module.exports.report = () => `'match' should be a function`;

module.exports.replace = () => ({
    'module.exports.match= __object': 'module.exports.match = () => __object',
});
