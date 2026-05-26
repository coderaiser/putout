__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        import cjs from "./a.js";
    `],
    ['/lib/a.js', `{}`],
]);
