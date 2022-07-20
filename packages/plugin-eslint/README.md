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
        "eslint/remove-overrides-with-empty-rules": "on"
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

`overrides` with `rules: {}` has no sense. Check out in 🐊[**Putout Editor**]:

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

## License

MIT
