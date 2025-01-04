__putout_processor_filesystem([
    "/",
    ["/package.json", `{
         "exports": {
            ".": {
                "node": {
                    "require": "./lib/supertape.js",
                    "import": "./lib/supertape.mjs"
                },
                "default": "./lib/supertape.js"
            }
        }
    }`],
    "/lib/",
    "/lib/supertape.js",
    "/lib/supertape.mjs",
]);
