# putout-plugin-convert-array-copy-to-slice [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-array-copy-to-slice.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-array-copy-to-slice"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-array-copy-to-slice
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-array-copy-to-slice

`putout` plugin convert `spread` to `Array.from`.

## Install

```
npm i @putout/plugin-convert-array-copy-to-slice
```

## Rule

```json
{
    "rules": {
        "convert-array-copy-to-slice": true
    }
}
```

## ❌ Incorrect code example

```js
const places = [
    ...items
];
```

## ✅ Correct code Example

```js
const places = items.slice();
```

## License

MIT

