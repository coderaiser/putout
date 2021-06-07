# @putout/plugin-remove-useless-conversion [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-conversion.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-conversion"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-conversion
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-conversion

`putout` plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-remove-useless-conversion
```

## Rule

```json
{
    "rules": {
        "remove-useless-conversion/named": "on",
        "remove-useless-conversion/with-double-negations": "on"
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
