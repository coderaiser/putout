# @putout/plugin-convert-throw [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-throw.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-throw "npm"

`putout` plugin adds ability convert throw statement into throw expression.

## Install

```
npm i @putout/plugin-convert-throw -D
```

## Rule

```json
{
    "rules": {
        "convert-throw": "on"
    },
    "plugins": [
        "convert-throw"
    ]
}
```

## ❌ Incorrect code example

```js
const fn = () => {throw Error('hello');};
```

## ✅ Correct code Example

```js
const fn = () => throw Error('hello');
```

## License

MIT
