# @putout/plugin-convert-concat-to-flat [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-concat-to-flat.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-concat-to-flat "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-concat-to-flat
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-concat-to-flat

`putout` plugin adds ability to convert `concat` to `flat`.

## Install

```
npm i @putout/plugin-convert-concat-to-flat -D
```

## Rule

```json
{
    "rules": {
        "convert-concat-to-flat": "on"
    }
}
```

## ❌ Incorrect code example

```js
[].concat(...array);
```

## ✅ Correct code Example

```js
array.flat();
```

## License

MIT
