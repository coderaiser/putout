# @putout/plugin-apply-is-array [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-is-array.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-is-array "npm"

`putout` plugin adds ability to apply `Array.isArray()`. Fits good with [@putout/plugin-declare-undefined-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare-undefined-variables).

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

## ❌ Incorrect code example

```js
x instanceof Array;
```

## ✅ Correct code Example

```js
const {isArray} = Array;
isArray(x);
```

In case of using `inline` option:

```json
{
    "rules": {
        "apply-is-array": ["on", {
            "inline": true,
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
