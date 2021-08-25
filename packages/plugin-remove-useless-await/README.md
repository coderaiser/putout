# @putout/plugin-remove-useless-await [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-await.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-await "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-await
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-await

`putout` plugin adds ability to apply shorthand properties. Part of [@putout/plugin-promises](https://github.com/coderaiser/putout/tree/master/packages/plugin-promises).

## Install

```
npm i @putout/plugin-remove-useless-await
```

## Rule

```json
{
    "rules": {
        "remove-useless-await": "on"
    }
}
```

## ❌ Incorrect code example

```js
await await Promise.resolve();
```

## ✅ Correct code Example

```js
await Promise.resolve();
```

## License

MIT
