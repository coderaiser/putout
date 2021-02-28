# @putout/plugin-convert-assignment-to-arrow-function [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-assignment-to-arrow-function.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-assignment-to-arrow-function"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-assignment-to-arrow-function
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-assignment-to-arrow-function

`putout` plugin adds ability to convert assignment to arrow function.

## Install

```
npm i @putout/plugin-convert-assignment-to-arrow-function -D
```

## Rule

```json
{
    "rules": {
        "convert-assignment-to-arrow-function": "on"
    }
}
```

## ❌ Incorrect code example

```js
const createRegExp = (a) => RegExp(a, 'g');
```

## ✅ Correct code Example

```js
const createRegExp = (a) => RegExp(a, 'g');
```

## License

MIT
