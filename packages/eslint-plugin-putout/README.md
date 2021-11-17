# eslint-plugin-putout [![NPM version][NPMIMGURL]][NPMURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/eslint-plugin-putout.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/eslint-plugin-putout "npm"
[CoverageURL]: https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

[ESLint](https://eslint.org) plugin for putout with built-in rules from [@putout/eslint-config](https://github.com/coderaiser/eslint-plugin-putout/tree/master/packages/eslint-config).

## Installation

```
$ npm i putout eslint eslint-plugin-putout -D
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `putout` and `eslint-plugin-putout` globally.

## Usage

Add `putout` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

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
        "putout/putout": "error",
        "putout/single-property-destructuring": "error",
        "putout/multiple-properties-destructuring": "error",
        "putout/long-properties-destructuring": "error",
        "putout/destructuring-as-function-argument": "error",
        "putout/align-spaces": "error",
        "putout/keyword-spacing": "error",
        "putout/newline-function-call-arguments": "error",
        "putout/function-declaration-paren-newline": "error",
        "putout/add-newlines-between-types-in-union": "error",
        "putout/remove-newline-after-default-import": "error",
        "putout/remove-newline-from-empty-object": "error",
        "putout/remove-empty-newline-before-first-specifier": "error",
        "putout/remove-empty-newline-after-last-specifier": "error",
        "putout/objects-braces-inside-array": "error",
        "putout/object-init": "error"
    }
}
```

## Supported Rules

- [putout](lib/putout)
- [Single property destructuring](/packages/eslint-plugin-putout/lib/single-property-destructuring)
- [Multiple properties destructuring](/packages/eslint-plugin-putout/lib/multiple-properties-destructuring)
- [For-of multiple properties destructuring](/packages/eslint-plugin-putout/lib/for-of-multiple-properties-destructuring)
- [Long properties destructuring](/packages/eslint-plugin-putout/lib/long-properties-destructuring)
- [Destructuring as function argument](/packages/eslint-plugin-putout/lib/destructuring-as-function-argument)
- [Align spaces](/packages/eslint-plugin-putout/lib/align-spaces)
- [Keyword spacing](/packages/eslint-plugin-putout/lib/keyword-spacing)
- [Newline function call arguments](/packages/eslint-plugin-putout/lib/newline-function-call-arguments)
- [Function declaration paren newline](/packages/eslint-plugin-putout/lib/function-declaration-paren-newline)
- [Add newlines between types in union](/packages/eslint-plugin-putout/lib/add-newlines-between-types-in-union)
- [Remove newline after default import](/packages/eslint-plugin-putout/lib/remove-newline-after-default-import)
- [Remove newline from empty object](/packages/eslint-plugin-putout/lib/remove-newline-from-empty-object)
- [Remove empty newline before first specifier](/packages/eslint-plugin-putout/lib/remove-empty-newline-before-first-specifier)
- [Remove empty newline after last specifier](/packages/eslint-plugin-putout/lib/remove-empty-newline-after-last-specifier)
- [Objects braces inside array](/packages/eslint-plugin-putout/lib/objects-braces-inside-array)
- [Object init](/packages/eslint-plugin-putout/lib/object-init)
- [No unresolved](/packages/eslint-plugin-putout/lib/no-unresolved)
- [Evaluate](/packages/eslint-plugin-putout/lib/evaluate)
- [Tape: add new line before assertion]('/packages/eslint-plugin-putout/lib/tape-add-new-line-before-assertion)
- [Tape: add new line between tests]('/packages/eslint-plugin-putout/lib/tape-add-new-line-between-tests)

### Safe mode

When using `putout` in IDE with `--fix` on save, or when you want to disable the most dangerous rules, use:

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

List of disabled `putout` rules:

- [remove-empty](https://github.com/coderaiser/putout/tree/v20.0.0/packages/plugin-remove-empty);
- [remove-unused-variables](https://github.com/coderaiser/putout/tree/v20.0.0/packages/remove-unused-variables);
- [remove-unused-types](https://github.com/coderaiser/putout/tree/v20.0.0/packages/remove-unused-types);
- [remove-unused-for-of-variables](https://github.com/coderaiser/putout/tree/v20.0.0/packages/remove-unused-for-of-variables);
- [remove-unused-expressions](https://github.com/coderaiser/putout/tree/v20.0.0/packages);
- [remove-useless-return](https://github.com/coderaiser/putout/tree/master/remove-useless-return);
- [remove-skip](https://github.com/coderaiser/putout/tree/v20.0.0/packages/remove-skip);
- [remove-only](https://github.com/coderaiser/putout/tree/v20.0.0/packages/remove-only);
- [remove-console](https://github.com/coderaiser/putout/tree/v20.0.0/packages/remove-console);
- [remove-debugger](https://github.com/coderaiser/putout/tree/v20.0.0/packages/remove-debugger);
- [convert-for-to-for-of](https://github.com/coderaiser/putout/tree/v20.0.0/packages/convert-for-to-for-of);
