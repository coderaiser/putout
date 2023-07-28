'use strict';

module.exports.report = () => `Use '~~' instead of 'Math.floor()'`;

module.exports.replace = () => ({
    'Math.floor(__a)': '~~__a',
});
