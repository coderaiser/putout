# eslint-plugin-putout [![NPM version][NPMIMGURL]][NPMURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/eslint-plugin-putout.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/eslint-plugin-putout "npm"
[CoverageURL]: https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

[`ESLint`](https://eslint.org) plugin for 🐊[`Putout`](https://github.com/coderaiser/putout) with built-in rules from [`@putout/eslint-config`](https://github.com/coderaiser/putout/tree/master/packages/eslint-config).

## Installation

```
$ npm i putout eslint eslint-plugin-putout -D
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `putout` and `eslint-plugin-putout` globally.

## Usage

Add `putout` to the plugins section of your `.eslintrc.json` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "extends": [
        "plugin:putout/recommended"
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
        "putout/add-newlines-between-types-in-union": "error",
        "putout/add-newline-before-function-call": "error",
        "putout/add-newline-after-function-call": "error",
        "putout/putout": "error",
        "putout/array-element-newline": "error",
        "putout/single-property-destructuring": "error",
        "putout/multiple-properties-destructuring": "error",
        "putout/long-properties-destructuring": "error",
        "putout/destructuring-as-function-argument": "error",
        "putout/align-spaces": "error",
        "putout/keyword-spacing": "error",
        "putout/newline-function-call-arguments": "error",
        "putout/function-declaration-paren-newline": "error",
        "putout/remove-newline-after-default-import": "error",
        "putout/remove-newline-from-empty-object": "error",
        "putout/remove-empty-newline-before-first-specifier": "error",
        "putout/remove-empty-newline-after-last-specifier": "error",
        "putout/remove-empty-newline-after-import": "error",
        "putout/remove-empty-specifiers": "error",
        "putout/objects-braces-inside-array": "error",
        "putout/object-init": "error"
    }
}
```

## Rules

- [Add newlines between types in union](/packages/eslint-plugin-putout/lib/add-newlines-between-types-in-union#readme)
- [Add newline before function call](/packages/eslint-plugin-putout/lib/add-newline-before-function-call#readme)
- [Add newline after function call](/packages/eslint-plugin-putout/lib/add-newline-after-function-call#readme)
- [Align spaces](/packages/eslint-plugin-putout/lib/align-spaces#readme)
- [Array element newline](/packages/eslint-plugin-putout/lib/array-element-newline#readme)
- [Evaluate](/packages/eslint-plugin-putout/lib/evaluate#readme)
- [Putout](lib/putout#readme)
- [Single property destructuring](/packages/eslint-plugin-putout/lib/single-property-destructuring#readme)
- [Multiple properties destructuring](/packages/eslint-plugin-putout/lib/multiple-properties-destructuring#readme)
- [For-of multiple properties destructuring](/packages/eslint-plugin-putout/lib/for-of-multiple-properties-destructuring#readme)
- [Long properties destructuring](/packages/eslint-plugin-putout/lib/long-properties-destructuring#readme)
- [Destructuring as function argument](/packages/eslint-plugin-putout/lib/destructuring-as-function-argument#readme)
- [Keyword spacing](/packages/eslint-plugin-putout/lib/keyword-spacing#readme)
- [Newline function call arguments](/packages/eslint-plugin-putout/lib/newline-function-call-arguments#readme)
- [Function declaration paren newline](/packages/eslint-plugin-putout/lib/function-declaration-paren-newline#readme)
- [Remove newline after default import](/packages/eslint-plugin-putout/lib/remove-newline-after-default-import#readme)
- [Remove newline from empty object](/packages/eslint-plugin-putout/lib/remove-newline-from-empty-object#readme)
- [Remove empty newline before first specifier](/packages/eslint-plugin-putout/lib/remove-empty-newline-before-first-specifier#readme)
- [Remove empty newline after last specifier](/packages/eslint-plugin-putout/lib/remove-empty-newline-after-last-specifier#readme)
- [Remove empty newline after import](/packages/eslint-plugin-putout/lib/remove-empty-newline-after-import#readme)
- [Remove empty specifiers](/packages/eslint-plugin-putout/lib/remove-empty-specifiers#readme)
- [Objects braces inside array](/packages/eslint-plugin-putout/lib/objects-braces-inside-array#readme)
- [Object init](/packages/eslint-plugin-putout/lib/object-init#readme)
- [No unresolved](/packages/eslint-plugin-putout/lib/no-unresolved#readme)
- [Tape: add newline before assertion]('/packages/eslint-plugin-putout/lib/tape-add-new-line-before-assertion#readme)
- [Tape: add newline between tests]('/packages/eslint-plugin-putout/lib/tape-add-new-line-between-tests#readme)
- [Tape: remove newline before t.end()]('/packages/eslint-plugin-putout/lib/tape-remove-newline-before-t-end#readme)

### Safe mode

When using 🐊`Putout` in IDE with `--fix` on save, or when you want to disable the most dangerous rules, use:

```json
{
    "extends": [
        "plugin:putout/safe"
    ],
    "plugins": [
        "putout"
    ]
}
```

Disabled `ESLint` rules:

- [`no-useless-return`](https://eslint.org/docs/rules/no-useless-return#readme)
- [`putout/remove-newline-from-empty-object`](https://eslint.org/docs/rules/no-useless-return#readme)

Disabled 🐊`Putout` rules:

- [`remove-empty`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/plugin-remove-empty#readme);
- [`nodejs/remove-process-exit`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/plugin-nodejs#remove-process-exit#readme);
- [`remove-unused-variables`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/remove-unused-variables#readme);
- [`typescript/remove-unused-types`](https://github.com/coderaiser/putout/tree/v24.0.2/packages/plugin-typescript#remove-unused-types#readme);
- [`remove-unused-for-of-variables`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/remove-unused-for-of-variables#readme);
- [`remove-unused-expressions`](https://github.com/coderaiser/putout/tree/v24.0.0/packages#readme);
- [`remove-unreferenced-variables`](https://github.com/coderaiser/putout/tree/24.1.0/packages#readme);
- [`remove-useless-return`](https://github.com/coderaiser/putout/tree/master/remove-useless-return#readme);
- [`remove-useless-arguments`](https://github.com/coderaiser/putout/tree/master/remove-useless-arguments#readme);
- [`remove-useless-spread`](https://github.com/coderaiser/putout/tree/master/remove-useless-spread/#readme#readme);
- [`remove-useless-variables/rename`](https://github.com/coderaiser/putout/tree/master/remove-useless-arguments#rename#readme);
- [`remove-skip`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/remove-skip#readme);
- [`remove-only`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/remove-only#readme);
- [`remove-console`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/remove-console#readme);
- [`remove-debugger`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/remove-debugger#readme);
- [`remove-unreachable-code`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/remove-unreachable-code#readme);
- [`convert-for-to-for-of`](https://github.com/coderaiser/putout/tree/v24.0.0/packages/convert-for-to-for-of#readme);

### safe+align

When you want to enable ability to align spaces on empty lines, while have all benefits of `safe` preset: use `safe+align`.
