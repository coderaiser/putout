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

- ✅ [add-putout](#add-putout);
- ✅ [apply-define-config](#apply-define-config);
- ✅ [apply-dir-to-flat](#apply-dir-to-flat);
- ✅ [apply-ignores](#apply-ignores);
- ✅ [apply-create-eslint](#apply-create-eslint);
- ✅ [apply-match-to-flat](#apply-match-to-flat);
- ✅ [apply-safe-align](#apply-safe-align);
- ✅ [convert-export-match-to-declaration](#convert-export-match-to-declaration);
- ✅ [convert-files-to-array](#convert-files-to-array);
- ✅ [convert-ide-to-safe](#convert-ide-to-safe);
- ✅ [convert-node-to-n](#convert-node-to-n);
- ✅ [convert-plugins-array-to-object](#convert-plugins-array-to-object);
- ✅ [convert-rc-to-flat](#convert-rc-to-flat);
- ✅ [convert-require-to-import](#convert-require-to-import);
- ✅ [declare](#declare);
- ✅ [move-putout-to-end-of-extends](#move-putout-to-end-of-extends);
- ✅ [remove-no-missing](#remove-no-missing);
- ✅ [remove-no-unpublished-require](#remove-no-unpublished-require);
- ✅ [remove-no-unsupported-features](#remove-no-unsupported-features);
- ✅ [remove-overrides-with-empty-rules](#remove-overrides-with-empty-rules);
- ✅ [remove-useless-slice](#remove-useless-slice);
- ✅ [remove-useless-properties](#remove-useless-properties);
- ✅ [remove-useless-match-to-flat](#remove-useless-match-to-flat);
- ✅ [remove-parser-options](#remove-parser-options);
- ✅ [remove-suffix-config](#remove-suffix-config);
- ✅ [remove-create-eslint-config-with-one-argument](#remove-create-eslint-config-with-one-argument);
- ✅ [remove-spread-from-create-eslint-config](#remove-spread-from-create-eslint-config);

## Config

```json
{
    "rules": {
        "eslint/add-putout": "on",
        "eslint/apply-define-config": "on",
        "eslint/apply-dir-to-flat": "on",
        "eslint/apply-create-eslint": "on",
        "eslint/apply-ignores": ["off", {
            "ignores": ["**/fixture"]
        }],
        "eslint/apply-safe-align": "on",
        "eslint/apply-match-to-flat": "on",
        "eslint/declare": "on",
        "eslint/move-putout-to-end-of-extends": "on",
        "eslint/convert-export-match-to-decleration": "on",
        "eslint/convert-files-to-array": "on",
        "eslint/convert-ide-to-safe": "on",
        "eslint/convert-require-to-import": "on",
        "eslint/convert-node-to-n": "on",
        "eslint/convert-plugins-array-to-object": "on",
        "eslint/convert-rc-to-flat": "off",
        "eslint/remove-no-missing": "on",
        "eslint/remove-no-unpublished-require": "on",
        "eslint/remove-no-unsupported-features": "on",
        "eslint/remove-overrides-with-empty-rules": "on",
        "eslint/remove-useless-slice": "on",
        "eslint/remove-useless-properties": "on",
        "eslint/remove-useless-match-to-flat": "on",
        "eslint/remove-parser-options": "on",
        "eslint/remove-suffix-config": "on",
        "eslint/remove-create-eslint-config-with-one-argument": "on",
        "eslint/remove-spread-from-create-eslint-config": "on"
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

## apply-define-config

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a3e2944d9298bca267b133fa4dc01131/fc0aa8718af032c67d310456e775c8590c3b9b70).

### ❌ Example of incorrect code

```js
import {safeAlign} from 'eslint-plugin-putout';
import {createESLintConfig} from '@putout/eslint-flat';

export default createESLintConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);
```

### ✅ Example of correct code

```js
import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from '@eslint/config';

export default defineConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);
```

## apply-ignores

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/4d25771243a5aa3db09330187fd835a0/34a8347b368f889316c5a3b004fe94393771ab93).
Legacy config:

```diff
{
    "extends": [
        "plugin:putout/safe+align",
        "plugin:node/recommended"
    ],
    "plugins": [
        "putout",
        "node"
    ],
    "ignorePatterns": [
        "**/fixture"
    ]
}
```

Flat config:

```diff
-export default safeAlign;
+export default [
+   ...safeAlign, {
+   ignores: [
+       "**/fixture"
+   ]
+}];
```

## apply-create-eslint

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a3e2944d9298bca267b133fa4dc01131/fc0aa8718af032c67d310456e775c8590c3b9b70).

### ❌ Example of incorrect code

```js
export default [
    ...safeAlign, {
        ignores: ['**/fixture'],
    },
];
```

### ✅ Example of correct code

```js
export default createESLintConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);
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

## apply-dir-to-flat

`matchToFlatDir()` and `mergeESLintConfigs` supports `__dirname` or `import.meta.url` starting from `v2` of [`@putout/eslint-flat`](https://www.npmjs.com/package/@putout/eslint-flat).

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/805d120cbee5d216b91473d5a71f8d78/1f5b440ef7b63b56a4a12cdfcafe419764a62889).

### ❌ Example of incorrect code

```js
const scriptsConfig = await matchToFlatDir('scripts');
const monoConfig = await mergeESLintConfigs(['codemods', 'packages', 'rules']);

module.exports = [
    ...scriptsConfig,
    ...monoConfig,
];
```

### ✅ Example of correct code

```js
// CommonJS
const scriptsConfig = await matchToFlatDir(__dirname, 'scripts');

// ESM
const monoConfig = await mergeESLintConfigs(import.meta.url, ['codemods', 'packages', 'rules']);

module.exports = [
    ...scriptsConfig,
    ...monoConfig,
];
```

## apply-match-to-flat

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/805d120cbee5d216b91473d5a71f8d78/1f5b440ef7b63b56a4a12cdfcafe419764a62889).

### ❌ Example of incorrect code

```js
import {safeAlign} from 'eslint-plugin-putout/config';

export default [
    ...safeAlign, {
        files: ['*.d.ts'],
        rules: {
            'no-var': 'off',
        },
    }, {
        files: ['*.spec.*'],
        rules: {
            'node/no-extraneous-import': 'off',
        },
    },
];
```

### ✅ Example of correct code

```js
import {safeAlign} from 'eslint-plugin-putout/config';

const config = matchToFlat({
    '*.d.ts': {
        'no-var': 'off',
    },
    '*.spec.*': {
        'node/no-extraneous-import': 'off',
    },
});

export default [
    ...safeAlign,
    ...config,
];
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

## convert-files-to-array

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a3f1acad4ce8d999ff9311126c1ed69f/68f98adff1c9b650d51e816e72142b2f86deeb87).

```diff
{
    "overrides": [{
-        "files": "test/*.js",
+        "files": ["test/*.js"],
         "rules": {
           "node/no-missing-require": "off"
        }
    }],
};
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

## remove-parser-options

> In flat config files, the `globals`, and `parserOptions` are consolidated under the `languageOptions` key;
>
> (c) [eslint.org](https://eslint.org/docs/latest/use/configure/migration-guide#configuring-language-options)

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d6b1cf2681ec6829f11aa2a5f0b60538/199de7e426b1ebeb7f0b242778dfce3fd345b2ae)

### ❌ Example of incorrect code

```js
const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2025,
            sourceType: 'module',
        },
    },
});
```

### ✅ Example of correct code

```js
const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
    },
});
```

## remove-suffix-config

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/5770e4174210dd3d811726b661a3336a/1c1bf17bb90dd57ae40bf71e5038dd21cfb71681).

### ❌ Example of incorrect code

```js
import {safeAlign} from 'eslint-plugin-putout/config';
```

### ✅ Example of correct code

```js
import {safeAlign} from 'eslint-plugin-putout';
```

## remove-create-eslint-config-with-one-argument

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/609b2ca3789d0b7220fb224e2f4f9aa2/4db953be75214e2c07f1c0eb4f81b74ad29ac2e8).

### ❌ Example of incorrect code

```js
export default createESLintConfig([safeAlign]);
```

### ✅ Example of correct code

```js
export default safeAlign;
```

## remove-spread-from-create-eslint-config

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/1e10683f0f1fbb6f5b3dd23a940b316c/6274c36dfa69a98e640e2ee1cdd5bfcbf52d36ee).

### ❌ Example of incorrect code

```js
export default createESLintConfig([
    safeAlign,
    ...matchToFlat(match),
]);
```

### ✅ Example of correct code

```js
export default createESLintConfig([safeAlign, matchToFlat(match)]);
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

### ✅ Example of correct code

```js
export default x;

module.exports = x;
```

## remove-useless-properties

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/bc90ecd03d5e55900d95797a4979adb4/aed3f14d3541674a2c08c61bf87ac0c0f833532b).

### ❌ Example of incorrect code

```js
module.exports = [
    ...safeAlign, {
        rules: {},
    },
];
```

## ✅ Example of correct code

```js
module.exports = safeAlign;
```

## remove-useless-match-to-flat

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/bab49b08d12e779729265c05423bb856/a0b80b8e52f5319c40174773f36d8afbffb1c8b9).

### ❌ Example of incorrect code

```js
import {safeAlign} from 'eslint-plugin-putout';

export let match;
export default createESLintConfig([safeAlign, matchToFlat(match)]);
```

## ✅ Example of correct code

```js
import {safeAlign} from 'eslint-plugin-putout';

export default safeAlign;
```

## convert-export-match-to-declaration

Fixes [apply-match-to-flat](#apply-match-to-flat).
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2962264f25b2a9764977b53eba1baf3d/c095282c78574a57418a5a4385b28ff79a62c2a5).

### ❌ Example of incorrect code

```js
module.exports.match = {
    'bin/**': {
        'no-process-exit': 'off',
    },
};

module.exports = [
    ...safeAlign, {
        rules: {
            'node/no-unsupported-features/node-builtins': 'off',
        },
    },
    ...matchToFlat(match),
];
```

## ✅ Example of correct code

```js
const match = {
    'bin/**': {
        'no-process-exit': 'off',
    },
};

module.exports = [
    ...safeAlign, {
        rules: {
            'node/no-unsupported-features/node-builtins': 'off',
        },
    },
    ...matchToFlat(match),
];

module.exports.match = match;
```

## declare

Declare:

- [`safeAlign`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#flat);

## convert-plugins-array-to-object

> On the surface, using a plugin in `flat config` looks very similar to using a plugin in `eslintrc`. The big difference is that `eslintrc` used `string`s whereas `flat configs` uses `object`s. Instead of specifying the name of a plugin, you import the plugin directly and place it into the plugins `key`.
>
> (c) [eslint.org](https://eslint.org/blog/2022/08/new-config-system-part-2/)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e3c56c40746e85d745774b1929181fdb/42c6c4c699ee8e389b96298f52d8911b5be603bc).

### ❌ Example of incorrect code

```js
import {types} from 'putout';

const {react} = types;

export default {
    plugins: [react],
};

module.exports = {
    plugins: ['react'],
};
```

## ✅ Example of correct code

```js
import {types} from 'putout';

const {react} = types;

export default {
    plugins: {
        react,
    },
};

module.exports = {
    plugins: ['react'],
};
```

## convert-rc-to-flat

Checkout in 🐊**Putout Editor**:

- [Scanner](https://putout.cloudcmd.io/#/gist/f2abf46afeb67b23de1c06e8e6d0f9bb/73b87d76149c4d680ca66a1358586865eb9f9361);
- [Traverser](https://putout.cloudcmd.io/#/gist/fcacf6f0b9f9e368568c108999882f33/dafdbca579d27e1a8ab0be7316eb1a9848d4037c);

Converts `.eslintrc.json`:

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
