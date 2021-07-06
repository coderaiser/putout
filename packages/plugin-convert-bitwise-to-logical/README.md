# @putout/plugin-convert-bitwise-to-logical [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-bitwise-to-logical.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-bitwise-to-logical "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-bitwise-to-logical
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-bitwise-to-logical

`putout` plugin adds ability to convert `bitwise` to `logical` operator.

## Install

```
npm i @putout/plugin-convert-bitwise-to-logical -D
```

## Rule

```json
{
    "rules": {
        "convert-bitwise-to-logical": "on"
    }
}
```

## ❌ Incorrect code example

```js
a | !b;
```

## ✅ Correct code Example

```js
a || !b;
```

## License

MIT
