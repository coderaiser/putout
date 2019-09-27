# putout-plugin-remove-useless-array-from [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-from.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-array-from"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-array-from
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-array-from

`putout` plugin adds ability to remove useless `Array.from`.

## Install

```
npm i @putout/plugin-remove-useless-array-from
```

## Rule

```json
{
    "rules": {
        "remove-useless-array-from": true
    }
}
```

## ❌ Incorrect code example

```js
for (const x of Array.from(y)) {}
```

## ✅ Correct code Example

```js
for (const x of y) {}
```

## License

MIT

