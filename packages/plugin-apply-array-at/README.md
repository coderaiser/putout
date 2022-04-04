# @putout/plugin-apply-array-at [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-array-at.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-array-at "npm"

> The `at()` method takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.
>
> This is not to suggest there is anything wrong with using the square bracket notation.
> For example `array[0]` would return the first item. However instead of using `array.length` for latter items; e.g. `array[array.length - 1]` for the last item, you can call `array.at(-1)`.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply [`array.at()`](https://github.com/tc39/proposal-relative-indexing-method).

## Install

```
npm i @putout/plugin-apply-array-at
```

## Rule

```json
{
    "rules": {
        "apply-array-at": "on"
    }
}
```

## ❌ Example of incorrect code

```ts
const latest = (a) => a[a.length - 1];
```

## ✅ Example of correct code

```ts
const latest = (a) => a.at(-1);
```

## License

MIT
