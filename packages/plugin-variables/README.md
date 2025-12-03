# @putout/plugin-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-variables "npm"

> A **variable** is a named reference to a **value**.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Variable)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform `variables`.

## Install

```
npm i @putout/plugin-variables -D
```

## Rules

- ✅ [remove-useless-assignment](#remove-useless-assignmenn);
- ✅ [remove-useless-declaration](#remove-useless-declaration);
- ✅ [remove-useless-duplicate](#remove-useless-duplicate);
- ✅ [remove-useless-variables](#remove-useless-variables);
- ✅ [remove-useless-rename](#remove-useless-rename);
- ✅ [split-declarations](#split-declarations);

## Config

```json
{
    "rules": {
        "variables/remove-useless-assignment": "on",
        "variables/remove-useless-declaration": ["on", {
            "maxLength": 20
        }],
        "variables/remove-useless-duplicate": "on",
        "variables/remove-useless-rename": "on",
        "variables/remove-useless-remove": "on",
        "variables/split-declarations": "on"
    }
}
```

## assignment

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a2f7fe5e2c294443576f95dce6fde67e/0699ccb4f7335e8e3f80de891913a8e3ad4f35e3).

### ❌ Example of incorrect code

```js
while (!(files = readDirectory(parentDir)).length) {}
```

### ✅ Example of correct code

```js
while (!readDirectory(parentDir).length) {}
```

## remove-useless-rename

### ❌ Example of incorrect code

```js
function hi(a) {
    const b = a;
}
```

### ✅ Example of correct code

```js
function hi(b) {}
```

## remove

### ❌ Example of incorrect code

```js
const child_process = require('node:child_process');

const {exec, spawn} = child_process;
```

### ✅ Example of correct code

```js
const {exec, spawn} = require('node:child_process');
```

### remove

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/041767876a6d41c82260b293a06c2b6b/addf2b49cf9235d9b7a1017065cec5dece232660).

### ❌ Example of incorrect code

```js
const a = 5;
const b = a;

const c = 5;

d = c;
```

### ✅ Example of correct code

```js
const b = 5;

d = 5;
```

### remove-useless-declaration

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/32177535829956ef4c7b51587a8853c3/1fe071ff6542dc66ffad55f4776733903ab07241).

### ❌ Example of incorrect code

```js
function x() {
    const a = 5;
    return a;
}

const z = b.c.replace('x', 'y');

b.c = z;
```

### ✅ Example of correct code

```js
function x() {
    return 5;
}

b.c = b.c.replace('x', 'y');
```

### remove-useless-duplicate

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/32177535829956ef4c7b51587a8853c3/52f19ab0e467ad7cc54fa8c554c3b0804de9d1ca).

### ❌ Example of incorrect code

```js
const DestructuringErrors = function DestructuringErrors(a, b) {
    return [a, b];
};
```

### ✅ Example of correct code

```js
function DestructuringErrors(a, b) {
    return [a, b];
}

bc = b.c.replace('x', 'y');
```

## remove-unreferenced

### ❌ Example of incorrect code

```js
let a;
let b;

a = 5;
b = 6;

console.log(a);
```

### ✅ Example of correct code

```js
let a;

a = 5;

console.log(a);
```

## split-declarations

> - The [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) statement declares a block-scoped local variable, optionally initializing it to a value.
> - [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) statements are also block-scoped. The value of a constant can't be changed through reassignment, and it can't be redeclared. However, if a constant is an **object** or **array** its properties or items can be updated or removed.
>
> (c) MDN

Add ability to find and split variable declarations because (re)moving a line is simpler and less error prone then changing coma (`,`) to colon (`;`).
For the same reason, **diff** of changed declarations are more comfortable to read.

### ❌ Example of incorrect code

```js
let a, b;
```

### ✅ Example of correct code

```js
let a;
let b;
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`remove-debugger`](https://github.com/coderaiser/putout/tree/master/packages/plugin-split-variable-declarations#readme) | ✅
⏣ **ESLint** | [`no-var`](https://eslint.org/docs/latest/rules/one-var) | ✅

## convert-const-to-let

> The `TypeError` object represents an error when attempting to modify a value that cannot be changed.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)

Convert `const` to `let` to avoid `TypeError`.
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/61ffff64a356c47e66af4ea17a9a755d/e7f5fa455c208a7faa9319d94130996d39afcbf7).

### ❌ Example of incorrect code

```js
let a = 5;

a = 3;
```

### ✅ Example of correct code

```js
let a = 5;

a = 3;
```

## License

MIT
