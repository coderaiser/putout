__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        import cjs from "./a.cjs";
    `],
    ['/lib/a.js', `export default 5\\n`],
]);
