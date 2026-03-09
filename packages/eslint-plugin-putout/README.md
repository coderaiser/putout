# eslint-plugin-putout [![NPM version][NPMIMGURL]][NPMURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/eslint-plugin-putout.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/eslint-plugin-putout "npm"
[CoverageURL]: https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

[**ESLint**](https://eslint.org) plugin for 🐊[**Putout**](https://github.com/coderaiser/putout) with built-in rules from [**@putout/eslint-config**](https://github.com/coderaiser/putout/tree/master/packages/eslint-config#readme).

## Installation

```
npm i putout eslint eslint-plugin-putout -D
```

☝️*If you installed `eslint` globally (using the `-g` flag) then you must also install `putout` and `eslint-plugin-putout` globally.*

## Usage

### Plugin

To use `putout` as ESLint plugin you can use in `eslint.config.js`

```js
import putout from 'eslint-plugin-putout';

export default [
    rules: {
        'putout/putout': 'error',
    },
    plugins: {
        putout,
    },
];
```

### Preset

Also you can import one of predefined preset:

- ✅ **recommended** - all rules enabled;
- ✅ **safe** - dangerous rules disabled;
- ✅ **safeAlign** - dangerous rules disabled + add whitespaces on empty lines;

Here is how it can look like:

```js
import {recommended} from 'eslint-plugin-putout';

export default recommended;
```

Or with [`defineConfig`](https://eslint.org/blog/2025/03/flat-config-extends-define-config-global-ignores/):

```js
import {defineConfig} from 'eslint/config';
import putout from 'eslint-plugin-putout';

export default defineConfig({
    plugins: {
        putout,
    },
    extends: [
        "putout/recommended",
    ]
});
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "putout/add-newlines-between-types-in-union": "error",
        "putout/add-newlines-between-specifiers": "error",
        "putout/add-newline-before-return": "error",
        "putout/add-newline-before-function-call": "error",
        "putout/add-newline-after-function-call": "error",
        "putout/putout": "error",
        "putout/array-element-newline": "error",
        "putout/single-property-destructuring": "error",
        "putout/multiple-properties-destructuring": "error",
        "putout/long-properties-destructuring": "error",
        "putout/destructuring-as-function-argument": "error",
        "putout/align-spaces": "error",
        "putout/newline-function-call-arguments": "error",
        "putout/function-declaration-paren-newline": "error",
        "putout/remove-newline-after-default-import": "error",
        "putout/remove-newline-between-declarations": "error",
        "putout/remove-newline-from-empty-object": "error",
        "putout/remove-empty-newline-before-first-specifier": "error",
        "putout/remove-empty-newline-after-last-specifier": "error",
        "putout/remove-empty-newline-after-last-element": "error",
        "putout/remove-empty-newline-after-import": "error",
        "putout/remove-empty-specifiers": "error",
        "putout/objects-braces-inside-array": "error",
        "putout/object-property-newline": "error",
        "putout/tape-add-newline-between-tests": "error",
        "putout/tape-add-newline-before-assertion": "error",
        "putout/tape-remove-newline-before-t-end": "error"
    }
}
```

## Rules

### 🐊 [Putout](https://github.com/coderaiser/putout#readme)

- ✅ [Putout](/packages/eslint-plugin-putout/lib/putout#readme)
- ✅ [Evaluate](/packages/eslint-plugin-putout/lib/evaluate#readme)

### 📼 [Supertape](https://github.com/coderaiser/supertape#readme)

- ✅ [add newline before assertion](/packages/eslint-plugin-putout/lib/tape-add-newline-before-assertion#readme)
- ✅ [add newline between tests](/packages/eslint-plugin-putout/lib/tape-add-newline-between-tests#readme)
- ✅ [remove newline before `t.end()`](/packages/eslint-plugin-putout/lib/tape-remove-newline-before-t-end#readme)

### TypeScript

- ✅ [Add newlines between types in union](/packages/eslint-plugin-putout/lib/add-newlines-between-types-in-union#readme)
- ✅ [Object property newline](/packages/eslint-plugin-putout/lib/object-property-newline#readme)

### ESM

- ✅ [Remove duplicate extension](/packages/eslint-plugin-putout/lib/remove-duplicate-extensions#readme)
- ✅ [Add newlines between specifiers](/packages/eslint-plugin-putout/lib/add-newlines-between-specifiers#readme)

### Formatting

- ✅ [Add newline before return](/packages/eslint-plugin-putout/lib/add-newline-before-return#readme)
- ✅ [Add newline before function call](/packages/eslint-plugin-putout/lib/add-newline-before-function-call#readme)
- ✅ [Add newline after function call](/packages/eslint-plugin-putout/lib/add-newline-after-function-call#readme)
- ✅ [Align spaces](/packages/eslint-plugin-putout/lib/align-spaces#readme)
- ✅ [Array element newline](/packages/eslint-plugin-putout/lib/array-element-newline#readme)
- ✅ [Single property destructuring](/packages/eslint-plugin-putout/lib/single-property-destructuring#readme)
- ✅ [Multiple properties destructuring](/packages/eslint-plugin-putout/lib/multiple-properties-destructuring#readme)
- ✅ [For-of multiple properties destructuring](/packages/eslint-plugin-putout/lib/for-of-multiple-properties-destructuring#readme)
- ✅ [Long properties destructuring](/packages/eslint-plugin-putout/lib/long-properties-destructuring#readme)
- ✅ [Destructuring as function argument](/packages/eslint-plugin-putout/lib/destructuring-as-function-argument#readme)
- ✅ [Newline function call arguments](/packages/eslint-plugin-putout/lib/newline-function-call-arguments#readme)
- ✅ [Function declaration paren newline](/packages/eslint-plugin-putout/lib/function-declaration-paren-newline#readme)
- ✅ [Remove newline between declarations](/packages/eslint-plugin-putout/lib/remove-newline-between-declarations#readme)
- ✅ [Remove newline after default import](/packages/eslint-plugin-putout/lib/remove-newline-after-default-import#readme)
- ✅ [Remove newline from empty object](/packages/eslint-plugin-putout/lib/remove-newline-from-empty-object#readme)
- ✅ [Remove empty newline before first specifier](/packages/eslint-plugin-putout/lib/remove-empty-newline-before-first-specifier#readme)
- ✅ [Remove empty newline after last specifier](/packages/eslint-plugin-putout/lib/remove-empty-newline-after-last-specifier#readme)
- ✅ [Remove empty newline after last element](/packages/eslint-plugin-putout/lib/remove-empty-newline-after-last-element#readme)
- ✅ [Remove empty newline after import](/packages/eslint-plugin-putout/lib/remove-empty-newline-after-import#readme)
- ✅ [Remove empty specifiers](/packages/eslint-plugin-putout/lib/remove-empty-specifiers#readme)
- ✅ [Objects braces inside array](/packages/eslint-plugin-putout/lib/objects-braces-inside-array#readme)
- ✅ [Nonblock statement body newline](/packages/eslint-plugin-putout/lib/nonblock-statement-body-newline#readme)

### Safe mode

When using 🐊**Putout** in IDE with `--fix` on save, or when you want to disable the most dangerous rules, use:

```js
import {safe} from 'eslint-plugin-putout';

export default safe;
```

Disabled **ESLint** rules:

- ❌ [`no-useless-return`](https://eslint.org/docs/rules/no-useless-return#readme)
- ❌ [`no-implicit-coercion`](https://eslint.org/docs/rules/no-implicit-coercion#readme)
- ❌ [`putout/remove-newline-from-empty-object`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/lib/remove-newline-from-empty-object#readme)

Disabled 🐊**Putout** rules:

- ❌ [`apply-template-literals`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-remove-empty#readme);
- ❌ [`convert-template-to-string`](https://github.com/coderaiser/putout/tree/v40.0.0/packages/convert-template-to-string#readme);
- ❌ [`remove-empty`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-remove-empty#readme);
- ❌ [`merge-duplicate-functions`](https://github.com/coderaiser/putout/tree/v37.12.0/packages/plugin-merge-duplicate-functions#readme);
- ❌ [`nodejs/remove-process-exit`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-nodejs#remove-process-exit#readme);
- ❌ [`typescript/remove-unused-types`](https://github.com/coderaiser/putout/tree/v24.0.2/packages/plugin-typescript#remove-unused-types#readme);
- ❌ [`remove-unused-expressions`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-remove-unused-expressions#readme);
- ❌ [`variables/remove-unused`](https://github.com/coderaiser/putout/tree/v41.0.0/packages/plugin-variables#remove-unused);
- ❌ [`variables/remove-useless`](https://github.com/coderaiser/putout/tree/v41.0.0/packages/plugin-variables#remove-useless);
- ❌ [`variables/remove-unreferenced`](https://github.com/coderaiser/putout/tree/v41.0.0/packages/plugin-variables#remove-unreferenced);
- ❌ [`remove-useless-arguments`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-useless-arguments#readme);
- ❌ [`return/remove-useless`](https://github.com/coderaiser/putout/tree/v38.0.0/packages/plugin-return#remove-useless);
- ❌ [`return/remove-last-empty`](https://github.com/coderaiser/putout/tree/v42.0.26/packages/plugin-return#remove-last-empty);
- ❌ [`remove-useless-spread`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-remove-useless-spread/#readme);
- ❌ [`tape/remove-skip`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-tape#remove-skip);
- ❌ [`tape/remove-only`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-tape#remove-only);
- ❌ [`remove-console`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-remove-console#readme);
- ❌ [`remove-debugger`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-remove-debugger#readme);
- ❌ [`remove-unreachable-code`](https://github.com/coderaiser/putout/tree/v29.0.0/packages/plugin-remove-unreachable-code#readme);
- ❌ [`for-of/for`](https://github.com/coderaiser/putout/tree/v29.1.2/packages/plugin-convert-for-to-for-of#readme);
- ❌ [`for-of/remove-useless`](https://github.com/coderaiser/putout/tree/v29.7.1/packages/plugin-for-of#remove-useless);
- ❌ [`for-of/remove-unused-variables`](https://github.com/coderaiser/putout/tree/29.7.1/packages/plugin-for-of#remove-unused-variables);
- ❌ [`maybe/noop`](https://github.com/coderaiser/putout/tree/29.2.4/packages/plugin-maybe#noop);
- ❌ [`remove-useless-push`](https://github.com/coderaiser/putout/tree/38.1.2/packages/plugin-remove-useless-push#readme);

### safeAlign

When you want to enable ability to align spaces on empty lines, while have all benefits of `safe` preset: use `safeAlign`.

### jsx

When you need to support `jsx` in files using `js` extension,  use:

```js
import {jsx} from 'eslint-plugin-putout;

export default jsx;
```

## License

MIT
