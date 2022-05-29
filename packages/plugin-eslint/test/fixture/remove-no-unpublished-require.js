__putout_processor_json({
    "overrides": [{
        "files": "test/*.js",
        "rules": {
            "node/no-unpublished-require": "off"
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
