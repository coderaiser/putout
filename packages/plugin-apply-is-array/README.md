# @putout/plugin-apply-is-array [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-is-array.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-is-array "npm"

> The `Array.isArray()` method determines whether the passed value is an `Array`.
> When checking for `Array` instance, `Array.isArray()` is preferred over `instanceof` because it works through `iframes`.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `Array.isArray()`. Fits good with [@putout/plugin-declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare#readme).

## Install

```
npm i @putout/plugin-apply-is-array
```

## Rule

```json
{
    "rules": {
        "apply-is-array": "on"
    }
}
```

## ❌ Example of incorrect code

```js
x instanceof Array;
```

## ✅ Example of correct code

```js
const {isArray} = Array;
isArray(x);
```

In case of using `inline` option:

```json
{
    "rules": {
        "apply-is-array": ["on", {
            "inline": true
        }]
    }
}
```

`Array.isArray` will be inlined:

```js
Array.isArray(x);
```

## License

MIT
