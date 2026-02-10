__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/a.js', `
        import modules from '../'
    `],
    ['/lib/index.js', `
        export const a = 3;
    `],
    '/json/',
    ['/package.json', '{"main": "lib/index.js"}'],
]);
