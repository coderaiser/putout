__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        import dotdot from './b/index.js';
    `],
    ['/lib/a.js', `
        import dotdot from './c.js';
    `],
    '/lib/b/',
    ['/lib/b/index.js', 'export default (a) => 5\\n'],
]);
