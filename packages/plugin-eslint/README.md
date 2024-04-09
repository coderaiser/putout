# @putout/plugin-eslint [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-eslint.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-eslint"npm"

> Find and fix problems in your JavaScript code
>
> (c) [eslint.org](https://eslint.org/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to automate fixing **ESLint** config.

## Install

```
npm i @putout/plugin-eslint -D
```

## Rules

```json
{
    "rules": {
        "eslint/add-putout": "on",
        "eslint/apply-safe-align": "on",
        "eslint/move-putout-to-end-of-extends": "on",
        "eslint/convert-ide-to-safe": "on",
        "eslint/convert-require-to-import": "on",
        "eslint/convert-node-to-n": "on",
        "eslint/remove-no-missing": "on",
        "eslint/remove-no-unpublished-require": "on",
        "eslint/remove-no-unsupported-features": "on",
        "eslint/remove-overrides-with-empty-rules": "on",
        "eslint/remove-useless-slice": "on",
        "eslint/convert-rc-to-flat": "off"
    }
}
```

## add-putout

```diff
{
    "extends": [
+       "plugin:putout/safe+align",
        "plugin:node/recommended"
    ],
    "plugins": [
+       "putout",
        "node"
    ]
}
```

## apply-safe-align

```diff
{
-    "rules": {
-       "putout/align-spaces": "error"
-    },
    "extends": [
-       "plugin:putout/safe",
+       "plugin:putout/safe+align",
        "plugin:node/recommended"
    ],
    "plugins": [
        "putout",
        "node"
    ]
}
```

## move-putout-to-end-of-extends

### ❌ Example of incorrect code

```json
{
    "extends": [
        "plugin:putout/recommended",
        "plugin:node/recommended"
    ],
    "plugins": [
        "putout",
        "node"
    ]
}
```

### ✅ Example of correct code

```json
{
    "extends": [
        "plugin:node/recommended",
        "plugin:putout/recommended"
    ],
    "plugins": [
        "putout",
        "node"
    ]
}
```

## convert-ide-to-safe

### ❌ Example of incorrect code

```json
{
    "extends": [
        "plugin:node/recommended",
        "plugin:putout/ide"
    ],
    "plugins": [
        "putout",
        "node"
    ]
}
```

### ✅ Example of correct code

```json
{
    "extends": [
        "plugin:node/recommended",
        "plugin:putout/safe"
    ],
    "plugins": [
        "putout",
        "node"
    ]
}
```

## convert-require-to-import

`node/no-missing-require` has no sense when `type=module` in `package.json`.
Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a3f1acad4ce8d999ff9311126c1ed69f/68f98adff1c9b650d51e816e72142b2f86deeb87).

```diff
{
    "overrides": [{
        "files": "test/*.js",
        "rules": {
-           "node/no-missing-require": "off"
+           "node/no-missing-import": "off"
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
};
```

## remove-no-unpublished-require

`node/remove-no-unpublished-require` should be enabled, since this is a very useful rule, which shows what files should be add to `.npmignore`.

```diff
{
    "overrides": [{
        "files": "test/*.js",
        "rules": {
-           "node/no-unpublished-require": "off"
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
};
```

## remove-no-unsupported-features

`node/remove-no-unsupported-features` is already disabled in [eslint-plugin-putout](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#readme).

```diff
{
    "overrides": [{
        "files": "test/*.js",
        "rules": {
-           "node/no-unpublished-require": "off"
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
};
```

## remove-overrides-with-empty-rules

`overrides` with `rules: {}` has no sense. Check out in 🐊**Putout Editor**:

- [remove empty `rules`](https://putout.cloudcmd.io/#/gist/a3f1acad4ce8d999ff9311126c1ed69f/68f98adff1c9b650d51e816e72142b2f86deeb87);
- [remove empty `overrides`](https://putout.cloudcmd.io/#/gist/46159f43d94f97ecbf131c850a39f711/a1aa918bec1019d7d33996ade0237ee4a5ceb390);

Remove `overrides` with one element with empty `rules`:

```diff
{
-   "overrides": [{
-       "files": "test/*.js",
-       "rules": {
-       }
-   }],
    "extends": [
        "plugin:node/recommended",
        "plugin:putout/recommended"
    ],
    "plugins": [
        "putout",
        "node"
    ]
};
```

Or remove empty `overrides`:

```diff
{
-   "overrides": [],
    "extends": [
        "plugin:node/recommended",
        "plugin:putout/recommended"
    ],
    "plugins": [
        "putout",
        "node"
    ]
};
```

And ofcourse remove only elements with empty `rules`:

```diff
{
  "overrides": [{
-   "files": "test/*.js",
-   "rules": {
-   }
- }, {
    "files": "test/*.js",
    "rules": {
      "no-semi": "off"
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
};
```

## convert-node-to-n

`eslint-plugin-node` [is no longer supported](https://github.com/mysticatea/eslint-plugin-node/issues/300). Better to use [`eslint-plugin-n`](https://github.com/weiran-zsd/eslint-plugin-node).

```diff
{
    "extends": [
        "plugin:putout/safe+align",
-       "plugin:node/recommended"
+       "plugin:n/recommended"
    ],
    "plugins": [
        "putout",
-       "node"
+       "n"
    ]
}
```

## remove-no-missing

`node/remove-no-missing-require` and `node/remove-no-missing-import` doesn't supports [`exports`](https://nodejs.org/dist/latest-v18.x/docs/api/packages.html#exports)
and already disabled by [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#readme).

```diff
{
    "overrides": [{
        "files": "test/*.js",
        "rules": {
-           "node/no-missing-require": "off",
-           "node/no-missing-import": "off"
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
};
```

## remove-useless-slice

Fixes code after [`convert-array-copy-to-slice`](http://github.com/coderaiser/putout/tree/master/packages/plugin-convert-array-copy-to-slice#readme).

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2962264f25b2a9764977b53eba1baf3d/c095282c78574a57418a5a4385b28ff79a62c2a5).

### ❌ Example of incorrect code

```js
export default x.slice();
module.exports = x.slice();
```

## ✅ Example of correct code

```js
export default x;
module.exports = x;
```

## convert-rc-to-flat

Checkout in 🐊**Putout Editor**:

- [Scanner](https://putout.cloudcmd.io/#/gist/f2abf46afeb67b23de1c06e8e6d0f9bb/73b87d76149c4d680ca66a1358586865eb9f9361);
- [Traverser](https://putout.cloudcmd.io/#/gist/fcacf6f0b9f9e368568c108999882f33/dafdbca579d27e1a8ab0be7316eb1a9848d4037c);

Converts `.eslintrc.json`:

### ❌ Example of incorrect code

```json
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
```

To `.eslint.config.js`:

```js
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
```

## License

MIT
