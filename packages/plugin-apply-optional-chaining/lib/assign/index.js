'use strict';

module.exports.report = () => `Use 'if condition' instead of 'ternary expression'`;

module.exports.replace = () => ({
    'if (__a) {__a.__b = __c}': '__a?.__b = __c',
    'if (__a) __a.__b = __c': '__a?.__b = __c',
    '__a && (__a.__b = __c)': '__a?.__b = __c',
});
