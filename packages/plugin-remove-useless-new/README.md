# @putout/plugin-remove-useless-new [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-new.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-new "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless operator `new`. Which has no sense for `Boolean`, `String`, `Number`, `Error`:

> Thus the function call `Error(…)` is equivalent to the object creation expression `new Error(…)` with the same arguments.
>
> (c) https://262.ecma-international.org/12.0/#sec-error-constructor

Same with `RegExp`:

> Thus the function call `RegExp(…)` is equivalent to the object creation expression `new RegExp(…)` with the same arguments.
>
> (c) https://tc39.es/ecma262/multipage/text-processing.html#sec-regexp-constructor

And [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) cannot be used with `new`, as it is primitive.

## Install

```
npm i @putout/plugin-remove-useless-new
```

## Rule

```json
{
    "rules": {
        "remove-useless-new": "on"
    }
}
```

## ❌ Example of incorrect code

```js
new Error('Something whent wrong');
```

## ✅ Example of correct code

```js
Error('Something whent wrong');
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`remove-useless-new`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-useless-new#readme)| ✅
🦕 **ESLint** | [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers) | ❌
| [`no-new-object`](https://eslint.org/docs/rules/no-new-object) | ❌
| [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor) | ❌

## License

MIT
