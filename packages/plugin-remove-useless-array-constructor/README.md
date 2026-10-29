# @putout/plugin-remove-useless-array-constructor [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-constructor.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-array-constructor "npm"

> TypeScript code must not use the `Array()` constructor, with or without new. It has confusing and contradictory usage.
>
> (c) [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html#array-constructor)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin removes useless [Array constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array).
It has a different meaning for one, and couple arguments:

```js
const a = new Array(2); // [undefined, undefined]
const b = new Array(2, 3); // [2, 3];
```

## Install

```
npm i @putout/plugin-remove-useless-array-constructor -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-array-constructor": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const a = Array(1, 2, 3);
```

## ✅ Example of correct code

```js
const a = [1, 2, 3];
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`remove-useless-array-constructor`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-useless-array-constructor#readme)| ✅
⏣ **ESLint** | [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor) | ❌

## License

MIT
