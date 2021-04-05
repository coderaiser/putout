'use strict';

module.exports.report = () => 'Should be used "Array.at"';

module.exports.replace = () => ({
    '__a[__a.length - __b]': '__a.at(-__b)',
});

