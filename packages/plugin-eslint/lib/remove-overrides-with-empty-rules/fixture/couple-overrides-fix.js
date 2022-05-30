__putout_processor_json({
  "overrides": [{
        "files": "eslint-fixture/**/*.js",
        "rules": {
            "no-unreachable": "off"
        }
    }, {
        "files": "eslint-fixture/**/*.*",
        "rules": {
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-inferrable-types": "off"
        }
    }],
});

__putout_processor_json({});

__putout_processor_json({});
