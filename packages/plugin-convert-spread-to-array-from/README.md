# @putout/plugin-convert-spread-to-array-from [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-spread-to-array-from.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-spread-to-array-from"npm"

`putout` plugin convert `spread` to `Array.from`. Not installed, by default, used [@putout/plugin-convert-array-copy-to-slice](https://github.com/coderaiser/putout/tree/master/packages/plugin-convert-array-copy-to-slice) instead.

## Install

```
npm i @putout/plugin-convert-spread-to-array-from
```

## Rule

```json
{
    "rules": {
        "convert-spread-to-array-from": "on"
    }
}
```

## ❌ Incorrect code example

```js
const places = [
    ...runPlugins(),
];
```

## ✅ Correct code Example

```js
const places = Array.from(runPlugins());
```

## License

MIT
