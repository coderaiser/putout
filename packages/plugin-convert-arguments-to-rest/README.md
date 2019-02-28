# putout-plugin-convert-arguments-to-rest [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-arguments-to-rest.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-arguments-to-rest "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-arguments-to-rest
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-arguments-to-rest

`putout` plugin adds ability to convert `arguments` to `rest`.
## Install

```
npm i @putout/plugin-convert-arguments-to-rest -D
```

## Rule

```json
{
    "rules": {
        "convert-arguments-to-rest": true
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

