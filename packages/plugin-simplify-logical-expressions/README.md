# @putout/plugin-simplify-logical-expressions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-simplify-logical-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-simplify-logical-expressions "npm"

> The logical NOT (`!`) operator takes truth to falsity and vice versa.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to simplify **logical expressions** containing
comparisons which will always evaluate to `true` or `false` since it's  likely indications of programmer error.
Complements [`@putout/plugin-apply-comparison-order`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-comparison-order#readme).

## Install

```
npm i @putout/plugin-simplify-logical-expressions -D
```

## Rule

```json
{
    "rules": {
        "simplify-logical-expressions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const is = !(options && !options.bidirectional);

if (!left.type === 'UnaryExpression');

const oneOf = a || a;
const same = a === a;
```

## ✅ Example of correct code

```js
const is = !options || options.bidirectional;

if (left.type !== 'UnaryExpression');

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

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`simplify-logical-expressions`](https://github.com/coderaiser/putout/tree/master/packages/plugin-simplify-logical-expressions#readme)| ✅
⏣ **ESLint** | [`no-constant-binary-expression`](https://eslint.org/docs/rules/no-constant-binary-expression) | ❌

## License

MIT
