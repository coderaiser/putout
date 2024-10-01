__putout_processor_filesystem([
    "/",
    ["/package.json", `{
        "exports": {
            "./parse-options": "./lib/parse-options/index.js",
            "./loader": "./lib/loader.mjs"
        }
    }`],
    "/lib/",
    "/lib/parse-options/",
    ["/lib/parse-options/index.js", "export const a = 5"],
]);
