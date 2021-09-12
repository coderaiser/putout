# @putout/plugin-eslint [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-eslint.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-eslint"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/eslint?path=packages/plugin-eslint
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/eslint.svg?path=packages/plugin-eslint

[`putout`](https://github.com/coderaiser/putout) plugin helps to automate fixing `ESLint` config.

## Install

```
npm i @putout/plugin-eslint -D
```

## Rules

```json
{
    "rules": {
        "eslint/move-putout-to-end-of-extends": "on",
        "eslint/convert-ide-to-safe": "on"
    }
}
```

## move-putout-to-end-of-extends

### ❌ Incorrect code example

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

### ✅ Correct code Example

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

### ❌ Incorrect code example

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

### ✅ Correct code Example

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

## License

MIT
