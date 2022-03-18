# @putout/plugin-convert-equal-to-strict-equal [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-equal-to-strict-equal.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-equal-to-strict-equal "npm"

> The **strict equality** operator (`===`) checks whether its two operands are equal, returning a `Boolean` result. Unlike the **equality** operator (`==`), the **strict equality** operator always considers operands of different types to be different.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert **equal** to **strict equal** operator.

## Install

```
npm i @putout/plugin-convert-equal-to-strict-equal -D
```

## Rule

```json
{
    "rules": {
        "convert-equal-to-strict-equal": "off"
    }
}
```

## ❌ Example of incorrect code

```js
if (a == b) {
}
```

## ✅ Example of correct code

```js
if (a === b) {
}
```

## License

MIT
