# @putout/plugin-apply-at [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-at.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-at "npm"

> The `at()` method takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.
>
> (c) [Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

> The `at()` method takes an integer value and returns a new `String` consisting of the single UTF-16 code unit located at the specified offset. This method allows for positive and negative integers. Negative integers count back from the last string character.>
>
> (c) [String.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply [`array.at()`](https://github.com/tc39/proposal-relative-indexing-method).

## Install

```
npm i @putout/plugin-apply-at
```

## Rule

```json
{
    "rules": {
        "apply-at": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const latest = (a) => a[a.length - 1];
```

## ✅ Example of correct code

```js
const latest = (a) => a.at(-1);
```

## License

MIT
