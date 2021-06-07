# @putout/plugin-remove-useless-convertion [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-convertion.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-convertion"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-convertion
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-convertion

`putout` plugin adds ability to apply shorthand properties. Renamed to [@putout/remove-useless-type-conversion](https://www.npmjs.com/package/@putout/plugin-remove-useless-type-conversion)

## Install

```
npm i @putout/plugin-remove-useless-convertion
```

## Rule

```json
{
    "rules": {
        "remove-useless-convertion/named": "on",
        "remove-useless-convertion/with-double-negations": "on"
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
