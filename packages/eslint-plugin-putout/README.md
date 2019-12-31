# eslint-plugin-putout

[ESLint](https://eslint.org) plugin for putout with built-in rules from [@putout/eslint-config](https://github.com/coderaiser/putout/tree/master/packages/eslint-config).

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
        "putout/putout": "error",
        "putout/single-property-destructuring": "error",
        "putout/multiple-properties-destructuring": "error",
        "putout/long-properties-destructuring": "error",
        "putout/destructuring-as-function-argument": "error",
        "putout/align-spaces": "error",
        "putout/new-line-function-call-arguments": "error"
    }
}
```

## Supported Rules

- [putout](rules/putout.md)
- [Single property destructuring](/packages/eslint-plugin-putout/rules/single-property-destructuring.md)
- [Multiple properties destructuring](/packages/eslint-plugin-putout/rules/multiple-properties-destructuring.md)
- [For-of multiple properties destructuring](/packages/eslint-plugin-putout/rules/for-of-multiple-properties-destructuring.md)
- [Long properties destructuring](/packages/eslint-plugin-putout/rules/long-properties-destructuring.md)
- [Destructuring as function argument](/packages/eslint-plugin-putout/rules/destructuring-as-function-argument.md)
- [Align spaces](/packages/eslint-plugin-putout/rules/align-spaces.md)
- [Keyword spacing](/packages/eslint-plugin-putout/rules/keyword-spacing.md)
- [New line function call arguments](/packages/eslint-plugin-putout/rules/new-line-function-call-arguments.md)

