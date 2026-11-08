__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        const {isTime} = await import('./time.js?env-zero');
    `],
    ['/lib/time.js', `export default 5\\n`],
]);
