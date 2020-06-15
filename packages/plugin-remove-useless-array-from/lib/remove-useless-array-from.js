'use strict';

module.exports.report = () => '"Array.from" has no sense inside for-of';

module.exports.replace = () => ({
    'for (const __a of Array.from(__b)) __c': 'for (const __a of __b) __c',
});

