# putout-plugin-extract-sequence-expressions [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-extract-sequence-expressions.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-extract-sequence-expressions"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-extract-sequence-expressions
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-extract-sequence-expressions

`putout` plugin adds ability to convert Commonjs to ESM.

## Install

```
npm i @putout/plugin-extract-sequence-expressions -D
```

## Rule

```json
{
    "rules": {
        "extract-sequence-expressions": true
    }
}
```

## ❌ Incorrect code example

```js
module.exports.x = 1,
module.exports.y = 2;
```

## ✅ Correct code Example

```js
module.exports.x = 1;
module.exports.y = 2;
```

## License

MIT

