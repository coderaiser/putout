__putout_processor_filesystem([
    '/',
    '/hello/',
    '/hello/processors/',
    ['/hello/processors/load-processors-async.js', `
        import a from "../processors/parse-processor-names.js";
    `],
    ['/hello/processors/parse-processor-names.js', `export default 5`],
]);
