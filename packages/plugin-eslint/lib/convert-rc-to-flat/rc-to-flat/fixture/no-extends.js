__putout_processor_json({
  "root": true,
  "parser": "@typescript-eslint/parser",
  "env": {
    "node": true
  },
  "plugins": ["@nx"],
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": "error"
  },
  "overrides": [
    {
      "files": ["*.json"],
      "parser": "jsonc-eslint-parser",
      "rules": {}
    },
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "*",
                "onlyDependOnLibsWithTags": ["*"]
              }
            ]
          }
        ]
      }
    }
  ]
});
