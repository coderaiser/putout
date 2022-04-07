# @putout/plugin-simplify-ternary [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-simplify-ternary.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-simplify-ternary "npm"

> The **ternary** operator takes three operands: a condition followed by a question mark (`?`), then an expression to execute if the condition is truthy followed by a colon (`:`), and finally the expression to execute if the condition is falsy. This operator is frequently used as an alternative to an `if...else` statement.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to simplify **ternary** to **logical expression** when first and second operands are the same.

## Install

```
npm i @putout/plugin-simplify-ternary -D
```

## Rule

```json
{
    "rules": {
        "simplify-ternary": "on"
    }
}
```

## ❌ Example of incorrect code

```js
module.exports = fs.copyFileSync ? fs.copyFileSync : copyFileSync;

x = y ? y : z;
x = y ? z : y;
```

## ✅ Example of correct code

```js
module.exports = fs.copyFileSync || copyFileSync;

x = y || z;
x = y && z;
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`simplify-ternary`](https://github.com/coderaiser/putout/tree/master/packages/plugin-simplify-ternary#readme)| ✅
🦕 **ESLint** | [`no-unneeded-ternary`](https://eslint.org/docs/rules/no-unneeded-ternary) | ⚠️ (partially: no [MemberExpression](https://babeljs.io/docs/en/babel-types#memberexpression) support)

## License

MIT
