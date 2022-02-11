# @putout/plugin-convert-object-assign-to-merge-spread [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-object-assign-to-merge-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-object-assign-to-merge-spread"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert `Object.assign` to `merge spread`.

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

## ❌ Example of incorrect code

```js
function merge(a) {
    return Object.assign({}, a, {
        hello: 'world',
    });
}
```

## ✅ Example of correct code

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
