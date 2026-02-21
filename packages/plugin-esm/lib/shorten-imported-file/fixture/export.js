__putout_processor_filesystem([
    '/',
    '/processors/',
    ['/processors/load-processors-async.js', `
        export * from "../processors/parse-processor-names.js";
        export {a} from "../processors/parse-processor-names.js";
    `],
    ['/processors/parse-processor-names.js', `export const a = 5`],
]);
