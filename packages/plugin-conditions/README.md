# @putout/plugin-conditions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-conditions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-conditions "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) adds support of conditions transformations.

## Install

```
npm i @putout/plugin-conditions -D
```

## Rules

- ✅ [add-return](#add-return);
- ✅ [apply-comparison-order](#apply-comparison-order);
- ✅ [apply-consistent-blocks](#apply-consistent-blocks);
- ✅ [apply-if](#apply-if);
- ✅ [convert-comparison-to-boolean](#convert-comparison-to-boolean);
- ✅ [convert-equal-to-strict-equal](#convert-equal-to-strict-equal);
- ✅ [convert-arrow-to-condition](#convert-arrow-to-condition);
- ✅ [evaluate](#evaluate);
- ✅ [merge-if-statements](#merge-if-statements);
- ✅ [reverse](#reverse);
- ✅ [remove-boolean](#remove-boolean);
- ✅ [remove-constant](#remove-constant);
- ✅ [remove-same-values-condition](hremove-same-values-condition);
- ✅ [remove-useless-else](#remove-ureless-else);
- ✅ [remove-zero](#remove-zero);
- ✅ [remove-undefined](#remove-undefined);
- ✅ [simplify](#simplify);
- ✅ [wrap-with-block](#wrap-with-block);

## Config

```json
{
    "rules": {
        "conditions/apply-consistent-blocks": "on",
        "conditions/apply-comparison-order": "on",
        "conditions/apply-if": "on",
        "conditions/add-return": "on",
        "conditions/convert-comparison-to-boolean": "on",
        "conditions/convert-equal-to-strict-equal": "on",
        "conditions/convert-arrow-to-condition": "on",
        "conditions/evaluate": "on",
        "conditions/reverse": "on",
        "conditions/remove-boolean": "on",
        "conditions/remove-constant": "on",
        "conditions/remove-zero": "on",
        "conditions/remove-undefined": "on",
        "conditions/remove-useless-else": "on",
        "conditions/remove-same-values-condition": "on",
        "conditions/merge-if-statements": "on",
        "conditions/simplify": "on",
        "conditions/wrap-with-block": "on"
    }
}
```

## apply-consistent-blocks

> A **block statement** is used to group zero or more statements. The block is delimited by a pair of braces ("curly braces") and contains a list of zero or more statements and declarations.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)

Check out in 🐊**Putout Editor**:

- [Replacer](https://putout.cloudcmd.io/#/gist/9035db21bae7b6c76d1dc875d4c74828/07edbfd755060ae263949caf08b31aa43609375a);
- [Traverser](https://putout.cloudcmd.io/#/gist/77f84f100d82707925c73c1784f589f2/25923f46973b99f72378104778499ff75b550d2c);

### ❌ Example of incorrect code

```js
if (a > 3) {
    m();
}

if (a > 3)
    b = 5;
else {
    b = 6;
}

if (a > 3)
    b = 5;
else {
    b = 6;
    fn();
}
```

### ✅ Example of correct code

```js
if (a > 3)
    m();

if (a > 3)
    b = 5;
else
    b = 6;

if (a > 3) {
    b = 5;
} else {
    b = 6;
    fn();
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

## add-return

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b1c12a29951659bb54b283310027d6ef/b32270ca22a36728c67edf0dc0f0519876b78f16).

### ❌ Example of incorrect code

```js
if (a)
    false;
```

### ✅ Example of correct code

```js
if (a)
    return false;
```

## convert-arrow-to-condition

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/4d489393cd08dc771c6324eb0bb2e42f/9e85c4b7b7f2d0f82c660c6db618b31270d3a85e).

## ❌ Example of incorrect code

```js
if ((a) => b) {}
```

## ✅ Example of correct code

```js
if (a <= b) {}
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

if (a)
    console.log(a);
```

### ✅ Example of correct code

```js
const a = [];
const c = a;

console.log(a);
```

## reverse

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fabfc16a5a5d1002c721fc2dfc31474b/8d1de98533ef439e56e8784f54a34c3928a074fa).

### ❌ Example of incorrect code

```js
const check = (references) => !(references > 3);
```

### ✅ Example of correct code

```js
const check = (references) => references <= 3;
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

## remove-undefined

### ❌ Example of incorrect code

```js
if (b === undefined) {}

if (b !== undefined) {}
```

### ✅ Example of correct code

```js
if (!b) {}

if (b) {}
```

## simplify

### ❌ Example of incorrect code

```js
if (zone?.tooltipCallback)
    zone.tooltipCallback(e);

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
if (a > b)
    if (b < c)
        console.log('hello');
```

### ✅ Example of correct code

```js
if (a > b && b < c)
    console.log('hello');
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

## remove-same-values-condition

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e537d4ec636d4a9b849063a8326b70ae/661041b3fbb1e3678bf7f828e4c8bf6ca723f89d).

### ❌ Example of incorrect code

```js
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

## wrap-with-block

> If you use a declaration instead of a statement, it would be a `SyntaxError`. For example, a `let` declaration is not a statement, so you can't use it in its bare form as the body of an if statement.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements#difference_between_statements_and_declarations)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/256b1b6a904b0352c3a2716d365185ca/fac1c6365c01539392c674e2ca7468ee062e73e8).

### ❌ Example of incorrect code

```js
const a = 5;

if (a) {}
```

### ✅ Example of correct code

```js
if (a) {
    const a = 5;
}
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`conditions/remove-useless-else`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-debugger#readme) | ✅
⏣ **ESLint** | [`no-else-return`](https://eslint.org/docs/rules/no-else-return) | ✅

## License

MIT
