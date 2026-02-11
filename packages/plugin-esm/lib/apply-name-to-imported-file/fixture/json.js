__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        import dotdot from '../index.json';
    `],
    ['/index.json', '{"hello": "world"}'],
]);
