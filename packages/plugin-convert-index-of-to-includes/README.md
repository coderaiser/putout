# putout-plugin-convert-index-of-to-includes [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-index-of-to-includes.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-index-of-to-includes "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-index-of-to-includes
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-index-of-to-includes

`putout` plugin adds ability to convert `indexOf` to `includes`.
## Install

```
npm i @putout/plugin-convert-index-of-to-includes -D
```

## Rule

Rule `convert-index-of-to-includes` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-index-of-to-includes": false
    }
}
```

## ❌ Incorrect code example

```js
if (~array.indexOf(element)) {
}
```

## ✅ Correct code Example

```js
if (array.includes(element)) {
}
```

## License

MIT

