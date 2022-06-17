__putout_processor_json({
    "overrides": [{
        "files": "test/*.js",
        "rules": {
            "node/no-unsupported-features/es-syntax": "off"
        }
    }],
    "extends": [
        "plugin:node/recommended",
        "plugin:putout/recommended"
    ],
    "plugins": [
        "putout",
        "node"
    ]
});
