'use strict';

module.exports.report = () => `Use optional expression ('a?.b = c') instead of 'condition' ('a && a.b = c')`;

module.exports.replace = () => ({
    'if (__a) {__a.__b = __c}': '__a?.__b = __c',
    'if (__a) __a.__b = __c': '__a?.__b = __c',
    '__a && (__a.__b = __c)': '__a?.__b = __c',
});
