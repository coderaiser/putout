# @putout/plugin-convert-label-to-object [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-label-to-object.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-label-to-object "npm"

> A **labeled statement** is any `statement` that is prefixed with an `identifier`. You can jump to this label using a `break` or `continue` statement nested within the labeled statement.
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and convert `label` to `object`.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/86e2915cc2cffb6c26dd3bc2f2379a71/605562cf1fdf77a7918792955601e6767a805050).

## Install

```
npm i @putout/plugin-convert-label-to-object
```

## Rule

```json
{
    "rules": {
        "convert-label-to-object": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const a = () => ({
    hello: 'world',
    x: 'm',
});
```

## ✅ Example of correct code

```js
const a = () => ({
    hello: 'world',
    x: 'm',
});
```

## License

MIT
