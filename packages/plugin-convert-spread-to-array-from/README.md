# putout-plugin-convert-spread-to-array-from [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-spread-to-array-from.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-spread-to-array-from"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-spread-to-array-from
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-spread-to-array-from

`putout` plugin convert `spread` to `Array.from`.

## Install

```
npm i @putout/plugin-convert-spread-to-array-from
```

## Rule

```json
{
    "rules": {
        "convert-spread-to-array-from": true
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

