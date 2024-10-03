__putout_processor_json({
    "exports": {
        ".": {
            "import": "./lib/test.mjs"
        },
        "./index.js": {
            "require": "./lib/test.js",
            "import": "./lib/test.mjs"
        }
    }
});
