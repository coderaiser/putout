# @putout/plugin-convert-bitwise-to-logical [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-bitwise-to-logical.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-bitwise-to-logical "npm"

`putout` plugin adds ability to convert `bitwise` to `logical` operator.

## Install

```
npm i @putout/plugin-convert-bitwise-to-logical -D
```

## Rule

```json
{
    "rules": {
        "convert-bitwise-to-logical": "on"
    }
}
```

## ❌ Incorrect code example

```js
a | !b;
```

## ✅ Correct code Example

```js
a || !b;
```

## License

MIT
