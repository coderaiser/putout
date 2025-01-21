__putout_processor_json({
    "root": true,
    "rules": {
        "no-useless-return": "off"
    },
    "overrides": [{
        "files": "*md{ts}",
        "rules": {
            "n/no-unsupported-features/node-builtins": "off"
        }
    }],
});
