'use strict';

module.exports.report = () => `Use 'insertBefore(a, b)' instead of 'a.insertBefore(b)'`;

module.exports.replace = () => ({
    '__a.insertBefore(__b)': 'insertBefore(__a, __b)',
});
