# @putout/plugin-convert-comparison-to-boolean [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-comparison-to-boolean.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-comparison-to-boolean"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and convert `binary expression` to `boolean`.

## Install

```
npm i @putout/plugin-convert-comparison-to-boolean -D
```

## Rule

```json
{
    "rules": {
        "convert-comparison-to-boolean": "on"
    }
}
```

## ❌ Incorrect code example

```js
const t = 2 < 3;
```

## ✅ Correct code Example

```js
const t = false;
```

## License

MIT
