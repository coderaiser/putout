# @putout/plugin-convert-array-copy-to-slice [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-array-copy-to-slice.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-array-copy-to-slice"npm"

> [**Spread**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) syntax (`...`) allows an array expression to be expanded in places where elements are expected.
>
> The [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method returns a shallow copy of a portion of an array into a new array.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin convert **spread** to `slice()`.

## Install

```
npm i @putout/plugin-convert-array-copy-to-slice -D
```

## Rule

```json
{
    "rules": {
        "convert-array-copy-to-slice": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const places = [
    ...items,
];
```

## ✅ Example of correct code

```js
const places = items.slice();
```

## License

MIT
