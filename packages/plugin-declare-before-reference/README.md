# @putout/plugin-declare-before-reference [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-declare-before-reference.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-declare-before-reference "npm"

> The `ReferenceError` object represents an error when a variable hasn't yet been initialized in the current scope is referenced.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply declare before reference to avoid `ReferenceError`.

The rule is similar to **ESLint's** [no-use-before-define](https://eslint.org/docs/rules/no-use-before-define), but it's auto fixable,
and ignores:

- ✅ Function declarations
- ✅ Class declarations
- ✅ Different scopes

Also it works only on top level and helps to [@operator/declare](https://github.com/coderaiser/putout/tree/master/packages/operator-declare#readme) with a bunch of nested declarations.

## Install

```
npm i @putout/plugin-declare-before-reference
```

## Rule

```json
{
    "rules": {
        "declare-before-reference": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const {remove} = operator;

const {types, operator} = require('putout');
```

## ✅ Example of correct code

```js
const {types, operator} = require('putout');

const {remove} = operator;
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`declare-before-reference`](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare-before-reference#readme) | ✅
⏣ **ESLint** | [`no-use-before-define`](https://eslint.org/docs/rules/no-use-before-define) | ❌

## License

MIT
