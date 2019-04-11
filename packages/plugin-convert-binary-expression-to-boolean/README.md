# putout-plugin-convert-binary-expression-to-boolean [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-binary-expression-to-boolean.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-binary-expression-to-boolean"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-binary-expression-to-boolean
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-binary-expression-to-boolean

`putout` plugin adds ability to find and convert `binary expression` to `boolean`.

## Install

```
npm i @putout/plugin-convert-binary-expression-to-boolean -D
```

## Rule

```json
{
    "rules": {
        "convert-binary-expression-to-boolean": true
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

