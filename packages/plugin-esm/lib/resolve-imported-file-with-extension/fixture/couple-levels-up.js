__putout_processor_filesystem([
    '/',
    '/test/',
    '/test/server/',
    ['/test/server/before.js', `
        import modules from '../..'
    `],
    '/lib/',
    ['/lib/index.js', `
        export const a = 3;
    `],
    '/json/',
    ['/package.json', '{"main": "lib/index.js"}'],
]);
