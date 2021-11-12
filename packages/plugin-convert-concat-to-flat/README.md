# @putout/plugin-convert-concat-to-flat [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-concat-to-flat.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-concat-to-flat "npm"

`putout` plugin adds ability to convert `concat` to `flat`.

## Install

```
npm i @putout/plugin-convert-concat-to-flat -D
```

## Rule

```json
{
    "rules": {
        "convert-concat-to-flat": "on"
    }
}
```

## ❌ Incorrect code example

```js
[].concat(...array);
```

## ✅ Correct code Example

```js
array.flat();
```

## License

MIT
