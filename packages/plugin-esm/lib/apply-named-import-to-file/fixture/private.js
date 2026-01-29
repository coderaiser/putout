__putout_processor_filesystem([
    '/',
    ['/package.json', `{
        "imports": {
            "#b": "./lib/b/index.js"
        }
    }`],
    '/lib/',
    ['/lib/index.js', `
        import dotdot from '#b';
    `],
    '/lib/b/',
    ['/lib/b/index.js', 'export const dotdot = 7\\n'],
]);
