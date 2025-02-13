import {safeAlign} from 'eslint-plugin-putout/config';

module.exports = [
    ...safeAlign, {
        ignores: ['**/fixture'],
    },
];

export default [
    ...safeAlign, {
        ignores: ['**/fixture'],
    },
];

__putout_processor_json({
    'extends': [
        'plugin:n/recommended',
        'plugin:putout/recommended',
    ],
    'plugins': ['n', 'putout'],
    'ignorePatterns': ['**/fixture'],
});
