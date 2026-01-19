__putout_processor_json({
    "imports": {
        "#get-imports": "./lib/shorten-imported-file/get-imports/index.js",
        "#change-imports": "./lib/resolve-imported-file/change-imports/index.js",
        "#find-package": "./lib/apply-privately-imported-file/find-package.js"
    }
});

__putout_processor_json({});

__putout_processor_json({
    "imports": {
        "#get-imports": "./lib/shorten-imported-file/get-imports/index.js",
        "#get-imports": 5
    }
});
