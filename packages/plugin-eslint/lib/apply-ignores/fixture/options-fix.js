module.exports = [
    ...safeAlign, {
        ignores: ['**/fixtures', '**/tests'],
    },
];

export default [
    ...safeAlign, {
        ignores: ['**/fixtures', '**/tests'],
    },
];

__putout_processor_json({
    'extends': [
        'plugin:n/recommended',
        'plugin:putout/recommended',
    ],
    'plugins': ['n', 'putout'],
    'ignorePatterns': ['**/fixtures', '**/tests'],
});
