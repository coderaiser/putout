# @putout/plugin-apply-is-array [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-is-array.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-is-array"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-is-array
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-is-array

`putout` plugin adds ability to apply `Array.isArray()`.

## Install

```
npm i @putout/plugin-apply-is-array
```

## Rule

```json
{
    "rules": {
        "apply-is-array": "on"
    }
}
```

## ❌ Incorrect code example

```js
x instanceof Array;
```

## ✅ Correct code Example

```js
Array.isArray(x);
```

## License

MIT
