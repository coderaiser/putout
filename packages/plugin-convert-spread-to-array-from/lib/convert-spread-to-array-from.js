'use strict';

module.exports.report = () => `Array.from should be used instead of array spread`;

module.exports.replace = () => ({
    '[...__a]': 'Array.from(__a)',
});

