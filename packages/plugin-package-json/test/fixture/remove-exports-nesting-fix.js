__putout_processor_json({
    "exports": {
        "./a.js": "./lib/a.js"
    }
});

__putout_processor_json({});

__putout_processor_json({
    "exports": {
        "./a.js": "./lib/shorten-imported-file/get-imports/index.js",
        "./b.js": 5
    }
});
