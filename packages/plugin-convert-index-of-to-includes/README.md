# @putout/plugin-convert-index-of-to-includes [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-index-of-to-includes.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-index-of-to-includes "npm"

> The `includes()` method determines whether an array includes a certain value among its entries, returning `true` or `false` as appropriate.
>
> (c)[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `indexOf` to `includes`.

## Install

```
npm i @putout/plugin-convert-index-of-to-includes -D
```

## Rule

```json
{
    "rules": {
        "convert-index-of-to-includes": "on"
    }
}
```

## ❌ Example of incorrect code

```js
if (~array.indexOf(element)) {
}
```

## ✅ Example of correct code

```js
if (array.includes(element)) {
}
```

## License

MIT
