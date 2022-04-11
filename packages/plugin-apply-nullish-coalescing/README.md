# @putout/plugin-apply-nullish-coalescing [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-nullish-coalescing.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-nullish-coalescing"npm"

> The **nullish coalescing** operator (`??`) is a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, and otherwise returns its left-hand side operand.
> This can be seen as a special case of the logical OR (`||`) operator, which returns the right-hand side operand if the left operand is any falsy value, not only `null` or `undefined`. In other words, if you use `||` to provide some default value to another variable foo, you may encounter unexpected behaviors if you consider some falsy values as usable (e.g., `''` or `0`).
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin apply **nullish coalescing**.

## Install

```
npm i @putout/plugin-apply-nullish-coalescing
```

## Rule

```json
{
    "rules": {
        "apply-nullish-coalescing": "on"
    }
}
```

## ❌ Example of incorrect code

```js
result = result || 'hello';
result = typeof result === 'undefined' ? 'hello' : result;
```

## ✅ Example of correct code

```js
const result = result ?? 'hello';
```

## License

MIT
