# @putout/plugin-remove-duplicates-from-logical-expression [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-duplicates-from-logical-expression.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-duplicates-from-logical-expression"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-duplicates-from-logical-expression
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-duplicates-from-logical-expression

`putout` plugin adds ability to find and remove `duplicates` from logical expressions`.

## Install

```
npm i @putout/plugin-remove-duplicates-from-logical-expression -D
```

## Rule

```json
{
    "rules": {
        "remove-duplicates-from-logical-expression": true
    }
}
```

## ❌ Incorrect code example

```js
const t = a && b && a;
```

## ✅ Correct code Example

```js
const t = a && b;
```

## License

MIT

