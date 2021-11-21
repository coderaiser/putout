# @putout/plugin-convert-top-level-return [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-top-level-return.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-top-level-return"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability convert `top-level return` into `process.exit`.

## Install

```
npm i @putout/plugin-convert-top-level-return -D
```

## Rule

```json
{
    "rules": {
        "convert-top-level-return": "on"
    }
}
```

## ❌ Incorrect code example

```js
return;
```

## ✅ Correct code Example

```js
process.exit();
```

## License

MIT
