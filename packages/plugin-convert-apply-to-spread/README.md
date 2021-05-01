# @putout/plugin-convert-apply-to-spread [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-apply-to-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-apply-to-spread "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-apply-to-spread
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-apply-to-spread

`putout` plugin adds ability to convert `apply` to `spread`.

## Install

```
npm i @putout/plugin-convert-apply-to-spread -D
```

## Rule

```json
{
    "rules": {
        "convert-apply-to-spread": "on"
    }
}
```

## ❌ Incorrect code example

```js
console.log.apply(console, arguments);
```

## ✅ Correct code Example

```js
console.log(...arguments);
```

## License

MIT
