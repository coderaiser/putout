'use strict';

module.exports.report = () => `Useless spread should be avoided`;

module.exports.exclude = () => [
    '__a = {...__a}',
];

module.exports.replace = () => ({
    '({...__a})': '__a',
});
