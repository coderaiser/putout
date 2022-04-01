# @putout/plugin-declare-before-reference [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-declare-before-reference.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-declare-before-reference "npm"

> The `ReferenceError` object represents an error when a variable hasn't yet been initialized in the current scope is referenced.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply declare before reference to avoid `ReferenceError`.

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
const {
    types,
    operator,
} = require('putout');

const {remove} = operator;
```

## ✅ Example of correct code

```js
const {
    types,
    operator,
} = require('putout');

const {remove} = operator;
```

## License

MIT
