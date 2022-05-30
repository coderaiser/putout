__putout_processor_json({
    "overrides": [{
        "files": "test/*.js",
        "rules": {}
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
