# @putout/plugin-remove-useless-await [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-await.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-await "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to apply shorthand properties. Part of [@putout/plugin-promises](https://github.com/coderaiser/putout/tree/master/packages/plugin-promises).

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
