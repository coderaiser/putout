# putout-plugin-simplify-ternary [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-simplify-ternary.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-simplify-ternary "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-simplify-ternary
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-simplify-ternary

`putout` plugin adds ability to convert `arguments` to `rest`.
## Install

```
npm i @putout/plugin-simplify-ternary -D
```

## Rule

```json
{
    "rules": {
        "simplify-ternary": true
    }
}
```

## ❌ Incorrect code example

```js
module.exports = fs.copyFileSync ? fs.copyFileSync : copyFileSync;
```

## ✅ Correct code Example

```js
module.exports = fs.copyFileSync || copyFileSync;
```

## License

MIT

