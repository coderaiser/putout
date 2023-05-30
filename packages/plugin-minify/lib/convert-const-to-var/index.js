'use strict';

module.exports.report = () => `Use 'var' instead of 'const'`;
module.exports.replace = () => ({
    'const __a = __b': 'var __a = __b',
});
