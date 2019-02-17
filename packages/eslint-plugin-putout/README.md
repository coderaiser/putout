# eslint-plugin-putout

[ESLint](https://eslint.org) plagin for putout with built-in rules from [@putout/eslint-config](https://github.com/coderaiser/putout/tree/master/packages/eslint-config).

## Installation

```
$ npm i eslint eslint-plugin-putout -D
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-putout` globally.

## Usage

Add `putout` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "extends": [
        "plugin:putout/recommended",
    ],
    "plugins": [
        "putout"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "putout/one-line-destructuring": "error",
        "putout/destructuring-as-function-argument": "error",
        "putout/align-spaces": "error"
    }
}
```

## Supported Rules

- [One line destructuring](rules/one-line-destructuring.md)
- [Destructuring as function argument](rules/destructuring-as-function-argument.md)
- [Align spaces](rules/align-spaces.md)

