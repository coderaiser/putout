# @putout/plugin-remove-useless-array-constructor [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-constructor.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-array-constructor"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-array-constructor
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-array-constructor

`putout` plugin removes useless [Array constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array).
It has a different meaning for one, and couple arguments.

## Install

```
npm i @putout/plugin-remove-useless-array-constructor -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-array-constructor": "on"
    }
}
```

## ❌ Incorrect code example

```js
const a = Array(1, 2, 3);
```

## ✅ Correct code Example

```js
const a = [1, 2, 3];
```

## License

MIT

