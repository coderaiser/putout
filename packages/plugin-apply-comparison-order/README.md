# @putout/plugin-apply-comparison-order [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-comparison-order.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-comparison-order "npm"

> The result of evaluating an equality operator is always of type boolean based on whether the comparison is true.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply comparison order.
Checkout it 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/c61c94d2e1990f59b160aaf462f9a903/0855844b114079ec46098be6f3602dfdaa74290c).

## Install

```
npm i @putout/plugin-apply-comparison-order
```

## Rule

```json
{
    "rules": {
        "apply-comparison-order": "on"
    }
}
```

## ❌ Example of incorrect code

```js
3 === a;
```

## ✅ Example of correct code

```js
a === 3;
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`apply-comparison-order`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-comparison-order#readme)| ✅
🦕 **ESLint** | [`yoda`](https://eslint.org/docs/rules/yoda) | ½

## License

MIT
