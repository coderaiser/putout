__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        const dotdot  = await import('./b/index.js');
    `],
    ['/lib/a.js', `
        import dotdot from './c.js';
    `],
    '/lib/b/',
    ['/lib/b/index.js', 'export const dotdot = 7\\n'],
]);
