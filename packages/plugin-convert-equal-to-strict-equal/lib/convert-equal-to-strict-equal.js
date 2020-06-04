'use strict';

module.exports.report = () => 'Strict equal should be used instead of equal';

module.exports.exclude = () => [
    '__ == null',
    '__ != null',
];

module.exports.replace = () => ({
    '__a == __b': '__a === __b',
    '__a != __b': '__a !== __b',
});

