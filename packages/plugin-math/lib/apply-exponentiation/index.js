'use strict';

module.exports.report = () => `Use operator '**' instead of 'Math.pow()'`;

module.exports.replace = () => ({
    'Math.pow(__a, __b)': '__a ** __b',
    '__a * __a': '__a ** 2',
});
