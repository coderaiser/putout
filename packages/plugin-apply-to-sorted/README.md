# @putout/plugin-apply-to-sorted [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-to-sorted.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-to-sorted "npm"

> The `toSorted()` method of `Array` instances is the copying version of the `sort()` method. It returns a new array with the elements sorted in ascending order.
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `toSorted`.

## Install

```
npm i @putout/plugin-apply-to-sorted
```

## Rule

```json
{
    "rules": {
        "apply-to-sorted": "on"
    }
}
```

## ❌ Example of incorrect code

```js
[...a].sort((a, b) => a - b);
```

## ✅ Example of correct code

```js
a.toSorted((a, b) => a - b);
```

## License

MIT
