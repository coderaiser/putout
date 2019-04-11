# putout-plugin-remove-boolean-from-logical-expression [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-boolean-from-logical-expression.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-boolean-from-logical-expression"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-boolean-from-logical-expression
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-boolean-from-logical-expression

`putout` plugin adds ability to find and remove `constant conditions`.

## Install

```
npm i @putout/plugin-remove-boolean-from-logical-expression -D
```

## Rule

```json
{
    "rules": {
        "remove-boolean-from-logical-expression": true
    }
}
```

## ❌ Incorrect code example

```js
const t = true && false;
```

## ✅ Correct code Example

```js
const t = false;
```

## License

MIT

