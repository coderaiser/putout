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
        "conditions/remove-constant": "on",
        "conditions/remove-zero": "on",
        "conditions/remove-useless-else": "on",
        "conditions/remove-same-values-condition": "on",
        "conditions/merge-if-statements": "on"
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
if (a == b) {}
```

### ✅ Example of correct code

```js
if (a === b) {}
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

## remove-zero

### ❌ Example of incorrect code

```js
if (b === 0) {}

if (b !== 0) {}
```

### ✅ Example of correct code

```js
if (!b) {}

if (b) {}
```

## simplify

### ❌ Example of incorrect code

```js
if (zone?.tooltipCallback) {
    zone.tooltipCallback(e);
}

if (a)
    alert('hello');
else
    alert('hello');
```

### ✅ Example of correct code

```js
zone?.tooltipCallback(e);

alert('hello');
```

## merge-if-statements

> The `if` statement executes a statement `if` a specified condition is truthy.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

### ❌ Example of incorrect code

```js
if (a > b) {
    if (b < c) {
        console.log('hello');
    }
}
```

### ✅ Example of correct code

```js
if (a > b && b < c) {
    console.log('hello');
}
```

## remove-useless-else

> You can skip the `else` block if your `if` block always executes a `return` statement, it makes code a lot easier to read.
>
> (c) [no else return](https://www.samanthaming.com/tidbits/23-no-else-return/)

Remove useless `else` before:

- `return`;
- `continue`;
- `break`;

### ❌ Example of incorrect code

```js
if (x)
    return;
else
    console.log();
```

### ✅ Example of correct code

```js
if (x)
    return;

console.log();
```

## remove-same-values-condition"

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e537d4ec636d4a9b849063a8326b70ae/661041b3fbb1e3678bf7f828e4c8bf6ca723f89d).

### ❌ Example of incorrect code

```js
import {operator} from 'putout';
const {remove} = operator;

for (const [i, el] of entries(elements)) {
    if (el !== path)
        continue;
    
    if (!Number(i) && n) {
        path.parentPath.node.elements[i] = null;
        break;
    }
    
    if (el === path) {
        remove(path);
        break;
    }
}
```

### ✅ Example of correct code

```js
import {operator} from 'putout';
const {remove} = operator;

for (const [i, el] of entries(elements)) {
    if (el !== path)
        continue;
    
    if (!Number(i) && n) {
        path.parentPath.node.elements[i] = null;
        break;
    }
    
    remove(path);
}
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`conditions/remove-useless-else`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-debugger#readme) | ✅
⏣ **ESLint** | [`no-else-return`](https://eslint.org/docs/rules/no-else-return) | ✅

## License

MIT
