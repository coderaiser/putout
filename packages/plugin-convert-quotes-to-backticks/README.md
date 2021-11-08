# @putout/plugin-convert-quotes-to-backticks [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-quotes-to-backticks.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-quotes-to-backticks "npm"

`putout` plugin adds ability to convert `quotes` to `backticks`.

## Install

```
npm i @putout/plugin-convert-quotes-to-backticks -D
```

## Rule

```json
{
    "rules": {
        "convert-quotes-to-backticks": "on"
    }
}
```

## ❌ Incorrect code example

```js
const a = 'hello \'world\'';
```

## ✅ Correct code Example

```js
const a = `hello 'world'`;
```

## License

MIT
