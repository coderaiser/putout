'use strict';

module.exports.report = () => `Array should be copied using slice`;

module.exports.exclude = () => [
    '[...new Set(__a)]',
];

module.exports.replace = () => ({
    '[...__a]': '__a.slice()',
    '__a.map((a) => a)': '__a.slice()',
});

