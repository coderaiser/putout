'use strict';

module.exports.report = () => 'ESM should be used insted of Commonjs';

module.exports.exclude = () => [
    '__, __',
];

module.exports.replace = () => ({
    'module.exports = __a': 'export default __a',
    'module.exports.__a = __b' : 'export const __a = __b',
});

