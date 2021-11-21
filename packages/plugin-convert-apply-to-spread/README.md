# @putout/plugin-convert-apply-to-spread [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-apply-to-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-apply-to-spread "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert `apply` to `spread`.

## Install

```
npm i @putout/plugin-convert-apply-to-spread -D
```

## Rule

```json
{
    "rules": {
        "convert-apply-to-spread": "on"
    }
}
```

## ❌ Incorrect code example

```js
console.log.apply(console, arguments);
```

## ✅ Correct code Example

```js
console.log(...arguments);
```

## License

MIT
