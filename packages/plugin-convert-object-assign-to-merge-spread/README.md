# @putout/plugin-convert-object-assign-to-merge-spread [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-object-assign-to-merge-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-object-assign-to-merge-spread "npm"

> The [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method copies all enumerable own properties from one or more source objects to a target object and returns the modified target object.
>
> [**Spread**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) syntax (`...`) allows an object expression to be expanded in places where zero or more key-value pairs are expected.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `Object.assign()` to merge **spread** since it shorter but does (mostly) the same.

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

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`convert-object-assign-to-merge-spread`](https://github.com/coderaiser/putout/tree/master/packages/plugin-convert-object-assign-to-merge-spread#readme) | ✅
🦕 **ESLint** | [`prefer-object-spread`](https://eslint.org/docs/rules/prefer-object-spread) | ✅

## License

MIT
