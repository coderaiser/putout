'use strict';

module.exports.report = () => 'operator "**" should be used instead of Math.pow';

module.exports.replace = () => ({
    'Math.pow(__a, __b)': '__a ** __b',
});

