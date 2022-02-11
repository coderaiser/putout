# @putout/plugin-convert-math-pow [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-math-pow.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-math-pow "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert `Math.pow` to `exponentiation operator`.

## Install

```
npm i @putout/plugin-convert-math-pow -D
```

## Rule

Rule `convert-math-pow` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-math-pow": "off"
    }
}
```

## ❌ Example of incorrect code

```js
Math.pow(2, 4);
```

## ✅ Example of correct code

```js
2 ** 4;
```

## License

MIT
