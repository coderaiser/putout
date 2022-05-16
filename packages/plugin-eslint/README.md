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
        "eslint/apply-safe-align": "on",
        "eslint/move-putout-to-end-of-extends": "on",
        "eslint/convert-ide-to-safe": "on",
        "eslint/convert-require-to-import": "on",
        "eslint/convert-import-to-require": "on"
    }
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

## License

MIT
