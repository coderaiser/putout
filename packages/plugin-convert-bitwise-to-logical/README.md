# @putout/plugin-convert-bitwise-to-logical [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-bitwise-to-logical.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-bitwise-to-logical "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert `bitwise` to `logical` operator.

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

## ❌ Example of incorrect code

```js
a | !b;
```

## ✅ Example of correct code

```js
a || !b;
```

## License

MIT
