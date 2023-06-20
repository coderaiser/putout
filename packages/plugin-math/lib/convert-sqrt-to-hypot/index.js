'use strict';

module.exports.report = () => `Use 'Math.hypot()' instead of 'Math.sqrt()'`;

module.exports.replace = () => ({
    'Math.sqrt(__a ** 2)': 'Math.hypot(__a)',
    'Math.sqrt(__a ** 2 + __b ** 2)': 'Math.hypot(__a, __b)',
    'Math.sqrt(__a ** 2 + __b ** 2 + __c ** 2)': 'Math.hypot(__a, __b, __c)',
    'Math.sqrt(__a ** 2 + __b ** 2 + __c ** 2 + __d ** 2)': 'Math.hypot(__a, __b, __c, __d)',
    'Math.hypot(__a)': 'Math.abs(__a)',
});
