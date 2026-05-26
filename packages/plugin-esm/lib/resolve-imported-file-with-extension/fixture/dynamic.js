__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
       await import('..');
    `],
    ['/lib/a.js', `export default 5\\n`],
    '/lib/b/',
    ['/lib/b/index.js', 'export default 7\\n'],
    ['/package.json', '{"main": "lib/b/index.js"}'],
]);
