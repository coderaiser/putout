# @putout/plugin-add-missing-new [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-add-missing-new.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-add-missing-new "npm"

> The `Set` constructor lets you create Set objects that store unique values of any type, whether primitive values or object references.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to add missing operator `new`, since built-in objects:

- `Set`;
- `WeakSet`;
- `Map`;
- `WeakMap`;
- `Int8Array`;
- `Uint8Array`;
- `Uint8ClampedArray`;
- `Int16Array`;
- `Uint16Array`;
- `Int32Array`;
- `Uint32Array`;
- `Float32Array`;
- `Float64Array`;
- `BigInt64Array`;
- `BigUint64Array`;

Produces [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) when called without `new` like this:

```
Uncaught TypeError: Constructor Set requires 'new'
```

## Install

```
npm i @putout/plugin-add-missing-new
```

## Rule

```json
{
    "rules": {
        "add-missing-new": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const map = Map();
```

## ✅ Example of correct code

```js
const map = new Map();
```

## License

MIT
