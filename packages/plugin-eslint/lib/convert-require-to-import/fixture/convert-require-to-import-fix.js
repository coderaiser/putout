__putout_processor_json({
    "overrides": [{
        "files": "test/*.js",
        "rules": {
            'node/no-missing-import': "off"
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
