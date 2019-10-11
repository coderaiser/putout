# putout-plugin-convert-to-arrow-function [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-to-arrow-function.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-to-arrow-function"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-to-arrow-function
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-to-arrow-function

`putout` plugin convert `anonymous` to `arrow function`.

## Install

```
npm i @putout/plugin-convert-to-arrow-function
```

## Rule

```json
{
    "rules": {
        "convert-to-arrow-function": true
    }
}
```

## ❌ Incorrect code example

```js
module.exports = function(a, b) {
}
```

## ✅ Correct code Example

```js
module.exports = (a, b) => {
}
```

## License

MIT

