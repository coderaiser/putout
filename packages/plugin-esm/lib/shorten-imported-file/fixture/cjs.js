__putout_processor_filesystem([
    '/',
    '/processors/',
    ['/processors/load-processors-async.js', `
        import a from "../processors/parse-processor-names.cjs";
    `],
    ['/processors/parse-processor-names.cjs', `export default 5`],
]);
