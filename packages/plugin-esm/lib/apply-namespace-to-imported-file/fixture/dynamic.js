__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        const is = await import('./b/index.js');
    `],
    '/lib/b/',
    ['/lib/b/index.js', 'export const a = 7\\n'],
]);
