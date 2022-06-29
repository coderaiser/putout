# @putout/plugin-remove-useless-type-conversion [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-type-conversion.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-type-conversion "npm"

> It is possible to use a couple of **NOT** operators (`!!`) in series to explicitly force the conversion of any value to the corresponding boolean primitive. The conversion is based on the "truthyness" or "falsyness" of the value.
>
> The same conversion can be done through the `Boolean` function.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless type conversion.

## Install

```
npm i @putout/plugin-remove-useless-type-conversion
```

## Rule

```json
{
    "rules": {
        "remove-useless-type-conversion/named": "on",
        "remove-useless-type-conversion/with-double-negations": "on"
    }
}
```

## named

### ❌ Example of incorrect code

```js
const a = !![1].includes(1);
const b = Boolean([1].includes(1));
```

### ✅ Example of correct code

```js
const a = [1].includes(1);
```

## with-double-negations

### ❌ Example of incorrect code

```js
if (!!a) {
    console.log('hi');
}
```

### ✅ Example of correct code

```js
if (a) {
    console.log('hi');
}
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`remove-useless-type-conversion`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-useless-type-conversion#readme)| ✅
⏣ **ESLint** | [`no-implicit-coercion`](https://eslint.org/docs/rules/no-implicit-coercion) | ✅

## License

MIT
