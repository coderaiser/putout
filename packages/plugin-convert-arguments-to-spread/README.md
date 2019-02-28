# putout-plugin-convert-arguments-to-spread [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-arguments-to-spread.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-arguments-to-spread "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-arguments-to-spread
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-arguments-to-spread

`putout` plugin adds ability to convert `arguments` to `spread`.
## Install

```
npm i @putout/plugin-convert-arguments-to-spread -D
```

## Rule

```json
{
    "rules": {
        "convert-arguments-to-spread": true
    }
}
```

## ❌ Incorrect code example

```js
function hello() {
    console.log(arguments);
}
```

## ✅ Correct code Example

```js
function hello(...args) {
    console.log(args);
}
```

## License

MIT

