# @putout/plugin-convert-assignment-to-arrow-function [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-assignment-to-arrow-function.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-assignment-to-arrow-function"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert assignment to arrow function.

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

## ❌ Example of incorrect code

```js
const createRegExp = (a) => RegExp(a, 'g');
```

## ✅ Example of correct code

```js
const createRegExp = (a) => RegExp(a, 'g');
```

## License

MIT
