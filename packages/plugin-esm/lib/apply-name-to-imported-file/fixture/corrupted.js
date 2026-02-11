__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        import dotdot from '../index.js';
    `],
    ['/index.js', '{"hello": "world"}'],
]);
