__putout_processor_filesystem(["/", "/plugin-variables/", [
    "/plugin-variables/README.md",
    `
# @putout/plugin-eslint [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-eslint.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-eslint "npm"

> Find and fix problems in your JavaScript code
>
> (c) [eslint.org](https://eslint.org/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to automate fixing **ESLint** config.

## Install

\`\`\`
npm i @putout/plugin-eslint -D
\`\`\`

## Rules

- ✅ [convert-rc-to-flat](#convert-rc-to-flat);
- ✅ [remove-spread-from-create-eslint-config](#remove-spread-from-create-eslint-config);

## Config

\`\`\`json
{
    "rules": {
        "eslint/convert-rc-to-flat": "off",
        "eslint/remove-spread-from-create-eslint-config": "on"
    }
}
\`\`\`

## remove-spread-from-create-eslint-config

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/1e10683f0f1fbb6f5b3dd23a940b316c/6274c36dfa69a98e640e2ee1cdd5bfcbf52d36ee).

### ❌ Example of incorrect code

\`\`\`js
export default createESLintConfig([
    safeAlign,
    ...matchToFlat(match),
]);
\`\`\`

### ✅ Example of correct code

\`\`\`js
export default createESLintConfig([safeAlign, matchToFlat(match)]);
\`\`\`

## convert-rc-to-flat

Checkout in 🐊**Putout Editor**:

- [Scanner](https://putout.cloudcmd.io/#/gist/f2abf46afeb67b23de1c06e8e6d0f9bb/73b87d76149c4d680ca66a1358586865eb9f9361);
- [Traverser](https://putout.cloudcmd.io/#/gist/fcacf6f0b9f9e368568c108999882f33/dafdbca579d27e1a8ab0be7316eb1a9848d4037c);

Converts \`.eslintrc.json\`:

\`\`\`json
{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "env": {
        "node": true
    },
    "extends": ["eslint:recommended"],
    "plugins": ["@nx"],
    "rules": {
        "@typescript-eslint/explicit-module-boundary-types": "error"
    },
    "overrides": [{
        "files": ["*.json"],
        "parser": "jsonc-eslint-parser"
    }, {
        "files": [
            "*.ts",
            "*.tsx",
            "*.js",
            "*.jsx"
        ],
        "rules": {
            "@nx/enforce-module-boundaries": ["error", {
                "enforceBuildableLibDependency": true,
                "allow": [],
                "depConstraints": [{
                    "sourceTag": "*",
                    "onlyDependOnLibsWithTags": ["*"]
                }]
            }]
        }
    }]
}
\`\`\`

To \`.eslint.config.js\`:

\`\`\`js
const nxPlugin = require('@nx/eslint-plugin');
const js = require('@eslint/js');
const globals = require('globals');
const jsoncParser = require('jsonc-eslint-parser');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
    js.configs.recommended, {
        plugins: {
            '@nx': nxPlugin,
        },
    }, {
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.node,
            },
        },
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': ['error'],
        },
    }, {
        files: ['*.json'],
        languageOptions: {
            parser: jsoncParser,
        },
        rules: {},
    }, {
        files: [
            '*.ts',
            '*.tsx',
            '*.js',
            '*.jsx',
        ],
        rules: {
            '@nx/enforce-module-boundaries': ['error', {
                enforceBuildableLibDependency: true,
                allow: [],
                depConstraints: [{
                    sourceTag: '*',
                    onlyDependOnLibsWithTags: ['*'],
                }],
            }],
        },
    }];
\`\`\`

## License

MIT
`
]]);
