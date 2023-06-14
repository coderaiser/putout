# @putout/plugin-reuse-duplicate-init [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-reuse-duplicate-init.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-reuse-duplicate-init "npm"

> Functions are one of the fundamental building blocks it contains set of statements that performs a calculations, takes some input and returns an output. To use a function, you must define it somewhere in the scope from which you wish to call it.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to reuse duplicate init.

## Install

```
npm i @putout/plugin-reuse-duplicate-init -D
```

## Rule

```json
{
    "rules": {
        "reuse-duplicate-init": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const putout = require('putout');

const {
    a,
    b,
    operator,
} = require('putout');

const {replaceWith} = operator;
```

## ✅ Example of correct code

```js
const putout = require('putout');

const {
    a,
    b,
    operator,
} = putout;

const {replaceWith} = operator;
```

## License

MIT
