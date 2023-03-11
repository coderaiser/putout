# @putout/plugin-conditions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-conditions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-conditions "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) adds support of conditions transformations.

## Install

```
npm i @putout/plugin-conditions -D
```

## Rules

```json
{
    "rules": {
        "conditions/apply-comparison-order": "on",
        "conditions/apply-if": "on",
        "conditions/convert-comparison-to-boolean": "on",
        "conditions/convert-equal-to-strict-equal": "on",
        "conditions/evaluate": "on",
        "conditions/remove-boolean": "on",
        "conditions/remove-constant": "on"
    }
}
```

## apply-comparison-order

> The result of evaluating an equality operator is always of type boolean based on whether the comparison is true.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

Checkout it 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/c61c94d2e1990f59b160aaf462f9a903/0855844b114079ec46098be6f3602dfdaa74290c).

### ❌ Example of incorrect code

```js
3 === a;
3 < b;
```

### ✅ Example of correct code

```js
a === 3;
b > 3;
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`conditions/apply-comparison-order`](https://github.com/coderaiser/putout/tree/master/packages/plugin-conditions/#apply-comparison-order)| ✅
⏣ **ESLint** | [`yoda`](https://eslint.org/docs/rules/yoda) | ½

## apply-if

### ❌ Example of incorrect code

```js
if (2 > 3)
    ;

alert();
```

### ✅ Example of correct code

```js
if (2 > 3)
    alert();
```

## convert-comparison-to-boolean

> Strict equality compares two values for equality. Neither value is implicitly converted to some other value before being compared. If the values have different types, the values are considered unequal.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

## ❌ Example of incorrect code

```js
const t = 2 < 3;
```

## ✅ Example of correct code

```js
const t = false;
```

## convert-equal-to-strict-equal

> The **strict equality** operator (`===`) checks whether its two operands are equal, returning a `Boolean` result. Unlike the **equality** operator (`==`), the **strict equality** operator always considers operands of different types to be different.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)

### ❌ Example of incorrect code

```js
if (a == b) {
}
```

### ✅ Example of correct code

```js
if (a === b) {
}
```

## evaluate

> The **if** statement executes a statement if a specified condition is **truthy**. If the condition is **falsy**, another statement can be executed.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

### ❌ Example of incorrect code

```js
const a = [];
const c = a;

if (a) {
    console.log(a);
}
```

### ✅ Example of correct code

```js
const a = [];
const c = a;

console.log(a);
```

## remove-boolean

### ❌ Example of incorrect code

```js
if (a === true)
    alert();
```

### ✅ Example of correct code

```js
if (a)
    alert();
```

## remove-constant

### ❌ Example of incorrect code

```js
function hi(a) {
    if (2 < 3) {
        console.log('hello');
        console.log('world');
    }
}
```

### ✅ Example of correct code

```js
function hi(b) {
    console.log('hello');
    console.log('world');
}
```

## simplify

## ❌ Example of incorrect code

```js
if (zone?.tooltipCallback) {
    zone.tooltipCallback(e);
}

if (a)
    alert('hello');
else
    alert('hello');
```

## ✅ Example of correct code

```js
zone?.tooltipCallback(e);

alert('hello');
```

## License

MIT
