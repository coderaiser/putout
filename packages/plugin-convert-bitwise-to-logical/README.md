# @putout/plugin-convert-bitwise-to-logical [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-bitwise-to-logical.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-bitwise-to-logical "npm"

> The bitwise **OR** operator (`|`) returns a `1` in each bit position for which the corresponding bits of either or both operands are `1`s.
>
> The operands are converted to 32-bit integers and expressed by a series of bits (zeroes and ones).
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `bitwise` to `logical` operator, when one of operands is not a number,
since mostly likely it is an error.

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
