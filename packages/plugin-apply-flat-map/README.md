# @putout/plugin-apply-flat-map [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-flat-map.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-flat-map "npm"

> The `flatMap()` method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level.
> It is identical to a `map()` followed by a `flat()` of depth 1 (`arr.map(...args).flat()`), but slightly more efficient than calling those two methods separately.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `flatMap()`. Check out in [🐊**Putout Editor**](https://putout.cloudcmd.io/#/gist/0d3d44937de69ca266c4a11be5152eac/86af6566f93434ef86fdca919e57eaac7361a706).

## Install

```
npm i @putout/plugin-apply-flat-map
```

## Rule

```json
{
    "rules": {
        "apply-flat-map": "on"
    }
}
```

## ❌ Example of incorrect code

```js
array.map(getId).flat();
```

## ✅ Example of correct code

```js
array.flatMap(getId);
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`apply-flat-map`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-flat-map#readme) | ✅
⏣ **ESLint** | [`unicorn/prefer-flat-map`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md) | ✅
🏛 **Rome** | [`useFlatMap`](https://docs.rome.tools/lint/rules/useflatmap/) | ✅

## License

MIT
