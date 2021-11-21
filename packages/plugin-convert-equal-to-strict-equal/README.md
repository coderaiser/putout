# @putout/plugin-convert-equal-to-strict-equal [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-equal-to-strict-equal.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-equal-to-strict-equal "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert `equal` to `strict equal` loop.

## Install

```
npm i @putout/plugin-convert-equal-to-strict-equal -D
```

## Rule

Rule `convert-equal-to-strict-equal` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-equal-to-strict-equal": "off"
    }
}
```

## ❌ Incorrect code example

```js
if (a == b) {
}
```

## ✅ Correct code Example

```js
if (a === b) {
}
```

## License

MIT
