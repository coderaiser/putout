'use strict';

module.exports.report = () => `Use 'condition' instead of 'arrow function'`;

module.exports.replace = () => ({
    'if (__a => __b) __c': 'if (__a >= __b) __c',
});
