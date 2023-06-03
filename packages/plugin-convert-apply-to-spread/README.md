# @putout/plugin-convert-apply-to-spread [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-apply-to-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-apply-to-spread "npm"

> Spread syntax (`...`) allows an array expression to be expanded in places where zero or more arguments are expected.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `apply` to `spread`.

## Install

```
npm i @putout/plugin-convert-apply-to-spread -D
```

## Rule

```json
{
    "rules": {
        "convert-apply-to-spread": "on"
    }
}
```

## ❌ Example of incorrect code

```js
console.apply(null, arguments);
```

## ✅ Example of correct code

```js
console.log(...arguments);
```

## License

MIT
