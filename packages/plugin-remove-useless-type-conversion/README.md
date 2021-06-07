# @putout/plugin-remove-useless-type-conversion [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-type-conversion.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-type-conversion"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-type-conversion
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-type-conversion

`putout` plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-remove-useless-type-conversion
```

## Rule

```json
{
    "rules": {
        "remove-useless-type-conversion/named": "on",
        "remove-useless-type-conversion/with-double-negations": "on"
    }
}
```

## ❌ Incorrect code example

```js
const a = !![1].includes(1);
const b = Boolean([1].includes(1));
```

## ✅ Correct code Example

```js
const a = [1].includes(1);
```

## License

MIT
