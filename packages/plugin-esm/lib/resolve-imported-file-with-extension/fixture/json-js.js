__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        import a from "./a.json" with {type: "json"};
    `],
    ['/lib/a.js', `{}`],
]);
