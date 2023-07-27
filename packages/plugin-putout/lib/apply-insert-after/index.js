'use strict';

module.exports.report = () => `Use 'insertAfter(a, b)' instead of 'a.insertAfter(b)'`;

module.exports.replace = () => ({
    '__a.insertAfter(__b)': 'insertAfter(__a, __b)',
});
