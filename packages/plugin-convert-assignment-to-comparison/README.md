# @putout/plugin-convert-assignment-to-comparison [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-assignment-to-comparison.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-assignment-to-comparison"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert assignment to comparison.

## Install

```
npm i @putout/plugin-convert-assignment-to-comparison -D
```

## Rule

```json
{
    "rules": {
        "convert-assignment-to-comparison": "on"
    }
}
```

## ❌ Incorrect code example

```js
if (a = 5) {
}
```

## ✅ Correct code Example

```js
if (a === 5) {
}
```

## License

MIT
