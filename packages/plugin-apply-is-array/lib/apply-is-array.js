'use strict';

module.exports.report = () => 'Use Array.isArray() instead of instanceof';

module.exports.replace = () => ({
    '__a instanceof Array': 'Array.isArray(__a)',
});

