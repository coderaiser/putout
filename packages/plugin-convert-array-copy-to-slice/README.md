# @putout/plugin-convert-array-copy-to-slice [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-array-copy-to-slice.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-array-copy-to-slice"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin convert `spread` to [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

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
