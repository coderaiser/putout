# @putout/plugin-convert-object-assign-to-merge-spread [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-object-assign-to-merge-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-object-assign-to-merge-spread"npm"

`putout` plugin adds ability to convert `Object.assign` to `merge spread`.

## Install

```
npm i @putout/plugin-convert-object-assign-to-merge-spread -D
```

## Rule

```json
{
    "rules": {
        "convert-object-assign-to-merge-spread": "on"
    }
}
```

## ❌ Incorrect code example

```js
function merge(a) {
    return Object.assign({}, a, {
        hello: 'world',
    });
}
```

## ✅ Correct code Example

```js
function merge(a) {
    return {
        ...a,
        hello: 'world',
    };
}
```

## License

MIT
