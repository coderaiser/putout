# @putout/plugin-convert-array-copy-to-slice [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-array-copy-to-slice.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-array-copy-to-slice"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-array-copy-to-slice
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-array-copy-to-slice

`putout` plugin convert `spread` to [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

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

## ❌ Incorrect code example

```js
const places = [
    ...items,
];
```

## ✅ Correct code Example

```js
const places = items.slice();
```

## License

MIT
