# @putout/plugin-reuse-duplicate-init [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-reuse-duplicate-init.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-reuse-duplicate-init "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to reuse duplicate init.

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

## ❌ Incorrect code example

```js
const putout = require('putout');
const {a, b} = require('putout');
```

## ✅ Correct code Example

```js
const putout = require('putout');
const {a, b} = putout;
```

## License

MIT
