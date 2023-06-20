'use strict';

module.exports.report = () => `Use '*' instead of 'Math.imul()'`;

module.exports.replace = () => ({
    'Math.imul(__a, __b)': '__a * __b',
});
