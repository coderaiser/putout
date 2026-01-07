__putout_processor_filesystem([
    '/',
    '/processors/',
    ['/processors/load-processors-async.js', `
        import a from "../processors/parse-processor-names.js";
    `],
    ['/processors/parse-processor-names.js', `export default 5`],
]);
