__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        import modules from '../json/modules'
    `],
    '/json/',
    ['/json/modules.json', '{"type": "module"}'],
]);
