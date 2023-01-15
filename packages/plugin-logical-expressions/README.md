# @putout/plugin-logical-expressions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-logical-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-logical-expressions "npm"

> The logical NOT (`!`) operator takes truth to falsity and vice versa.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to simplify **logical expressions** containing
comparisons which will always evaluate to `true` or `false` since it's  likely indications of programmer error.

Complements [`@putout/plugin-apply-comparison-order`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-comparison-order#readme).

## Install

```
npm i @putout/plugin-logical-expressions -D
```

## Rule

```json
{
    "rules": {
        "logical-expressions/simplify": "on",
        "logical-expressions/remove-boolean": "on",
        "logical-expressions/remove-duplicates": "on",
        "logical-expressions/convert-bitwise-to-logical": "on"
    }
}
```

## simplify

### ❌ Example of incorrect code

```js
const is = !(options && !options.bidirectional);

if (!left.type === 'UnaryExpression') {}

const oneOf = a || a;
const same = a === a;
```

### ✅ Example of correct code

```js
const is = !options || options.bidirectional;

if (left.type !== 'UnaryExpression') {}

const oneOf = a;
const same = true;
```

The rule also simplify duplication use:

```diff
-if (a && b || a && c) {
+if (a && (b || c)) {
}
```

Wrong cases with `instanceof`:

```diff
-!a instanceof b;
-a instanceof !b;
-!a instanceof !b;
+!(a instanceof b);
```

Wrong cases with `in`:

```diff
-!a in b;
-a in !b;
+!(a in b);
```

In case of duplicates:

```diff
-a && b && a
+a && b
```

## remove-boolean

> A **boolean** is a logical data type that can have only the values `true` or `false`.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)

### ❌ Example of incorrect code

```js
const t = true && false;
```

### ✅ Example of correct code

```js
const t = false;
```

## remove-duplicates

### ❌ Example of incorrect code

```js
const t = a && b && a;
```

### ✅ Example of correct code

```js
const t = a && b;
```

## convert-bitwise-to-logical

> The bitwise **OR** operator (`|`) returns a `1` in each bit position for which the corresponding bits of either or both operands are `1`s.
>
> The operands are converted to 32-bit integers and expressed by a series of bits (zeroes and ones).
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR)

Convert `bitwise` to `logical` operator, when one of operands is not a number, since mostly likely it is an error.

### ❌ Example of incorrect code

```js
a | !b;
```

### ✅ Example of correct code

```js
a || !b;
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`logical-expressions`](https://github.com/coderaiser/putout/tree/master/packages/plugin-logical-expressions#readme)| ✅
⏣ **ESLint** | [`no-constant-binary-expression`](https://eslint.org/docs/rules/no-constant-binary-expression) | ❌

## License

MIT
