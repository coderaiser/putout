# eslint-plugin-putout [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/eslint-plugin-putout.svg?style=flat&longCache=true
[BuildStatusIMGURL]: https://img.shields.io/travis/coderaiser/eslint-plugin-putout/master.svg?style=flat&longCache=true
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/eslint-plugin-putout.svg?path=packages/eslint-plugin-putout
[NPMURL]: https://npmjs.org/package/eslint-plugin-putout "npm"
[BuildStatusURL]: https://travis-ci.org/coderaiser/eslint-plugin-putout "Build Status"
[DependencyStatusURL]: https://david-dm.org/coderaiser/eslint-plugin-putout?path=packages/eslint-plugin-putout "Dependency Status"
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

When use `putout` in IDE with `--fix` on save, use:

```json
{
    "extends": [
        "plugin:putout/ide"
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
        "putout/eslint-plugin-putout": "error",
        "putout/single-property-destructuring": "error",
        "putout/multiple-properties-destructuring": "error",
        "putout/long-properties-destructuring": "error",
        "putout/destructuring-as-function-argument": "error",
        "putout/align-spaces": "error",
        "putout/keyword-spacing": "error",
        "putout/newline-function-call-arguments": "error",
        "putout/function-declaration-paren-newline": "error",
        "putout/remove-newline-after-default-import": "error",
        "putout/objects-braces-inside-array": "error",
        "putout/variable-init-with-object": "error"
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
- [Remove newline after default import](/packages/eslint-plugin-putout/lib/remove-newline-after-default-import)
- [Objects braces inside array](/packages/eslint-plugin-putout/lib/objects-braces-inside-array)
- [Variable init with object](/packages/eslint-plugin-putout/lib/variable-init-with-object)
