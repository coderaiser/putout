# @putout/plugin-simplify-ternary [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-simplify-ternary.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-simplify-ternary "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to simplify `ternary`.

## Install

```
npm i @putout/plugin-simplify-ternary -D
```

## Rule

```json
{
    "rules": {
        "simplify-ternary": "on"
    }
}
```

## ❌ Incorrect code example

```js
module.exports = fs.copyFileSync ? fs.copyFileSync : copyFileSync;

x = y ? y : z;
x = y ? z : y;
```

## ✅ Correct code Example

```js
module.exports = fs.copyFileSync || copyFileSync;

x = y || z;
x = y && z;
```

## License

MIT
