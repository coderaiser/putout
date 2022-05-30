__putout_processor_json({
  "overrides": [{
        "files": ["test/*.mjs", "lib/**/*{.js,.spec.js}"],
        "rules": {}
    }, {
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

__putout_processor_json({
  "overrides": [{
        "files": ["test/*.mjs", "lib/**/*{.js,.spec.js}"],
        "rules": {}
    }],
});

__putout_processor_json({
  "rules": {},
  "overrides": [{
        "files": ["test/*.mjs", "lib/**/*{.js,.spec.js}"],
        "rules": {}
    }],
});
