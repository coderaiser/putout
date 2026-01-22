__putout_processor_json({
    "type": "module",
    "main": "./lib/putout.js",
    "exports": {
        ".": {
            "require": "./lib/index.cjs",
            "import": "./lib/index.js"
        },
        "./parse-error": "./lib/parse-error.cjs",
        "./ignores": "./lib/ignores.js"
    },
    "bin": {
        "putout": "bin/tracer.js"
    }
});

__putout_processor_json({
    "main": "./lib/putout.mjs",
    "exports": {
        ".": {
            "require": "./lib/index.js",
            "import": "./lib/index.mjs"
        },
        "./parse-error": "./lib/parse-error.js",
        "./ignores": "./lib/ignores.mjs"
    },
    "bin": {
        "putout": "bin/tracer.mjs"
    }
});
