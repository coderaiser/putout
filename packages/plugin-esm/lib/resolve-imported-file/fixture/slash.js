__putout_processor_filesystem([
    '/',
    '/lib/',
    '/lib/index.js',
    ['/lib/a.js', `
        import dotdot from './';
    `],
]);
