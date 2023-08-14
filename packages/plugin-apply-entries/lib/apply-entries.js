'use strict';

module.exports.report = () => `Use 'entries()' instead of '.entries()`;

module.exports.exclude = () => [
    'const entries = __'
];

module.exports.replace = () => ({
    '__a.entries()': 'entries(__a)',
});
