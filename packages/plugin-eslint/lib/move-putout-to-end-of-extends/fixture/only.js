__putout_processor_json({
    "overrides": [{
        "files": ["server/**/*.js"],
        "rules": {
            "node/no-unsupported-features/node-builtins": "off"
        },
        "extends": [
            "plugin:node/recommended"
        ],
        "plugins": ["node"]
    }],
    "extends": [
        "plugin:putout/recommended"
    ],
    "plugins": ["putout"]
});
