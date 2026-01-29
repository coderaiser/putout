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

- ✅ [apply-declarations-order](#apply-declarations-order);
- ✅ [convert-const-to-let](#convert-const-to-let');
- ✅ [extract-keywords](#extract-keywords');
- ✅ [reuse-duplicate-init](#reuse-duplicate-init);
- ✅ [remove-useless-assignment](#remove-useless-assignmenn);
- ✅ [remove-useless-declaration](#remove-useless-declaration);
- ✅ [remove-useless-duplicate](#remove-useless-duplicate);
- ✅ [remove-useless-variables](#remove-useless-variables);
- ✅ [remove-useless-rename](#remove-useless-rename);
- ✅ [remove-unused](#remove-unused);
- ✅ [split-declarations](#split-declarations);

## Config

```json
{
    "rules": {
        "variables/apply-declarations-order": "on",
        "variables/convert-const-to-let": "on",
        "variables/extract-keywords": "on",
        "variables/reuse-duplicate-init": "on",
        "variables/remove-useless-assignment": "on",
        "variables/remove-useless-declaration": ["on", {
            "maxLength": 20
        }],
        "variables/remove-useless-duplicate": "on",
        "variables/remove-useless-rename": "on",
        "variables/remove-useless-remove": "on",
        "variables/remove-unused": "on",
        "variables/split-declarations": "on"
    }
}
```

## apply-declarations-order

Helps to [reuse duplicate init](#reuse-duplicate-init'). Checkout in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/b70ff926b36e1e97ec7129aa0e0458a7/ece0a706de2fd24a66b4671284f7f75017f3c268).

### ❌ Example of incorrect code

```js
const {env} = require('node:process');
const process = require('node:process');
```

### ✅ Example of correct code

```js
const process = require('node:process');
const {env} = process;
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

## reuse-duplicate-init

> Functions are one of the fundamental building blocks it contains set of statements that performs a calculations, takes some input and returns an output. To use a function, you must define it somewhere in the scope from which you wish to call it.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to reuse duplicate init.

### ❌ Example of incorrect code

```js
const putout = require('putout');

const {
    a,
    b,
    operator,
} = require('putout');

const {replaceWith} = operator;
```

### ✅ Example of correct code

```js
const putout = require('putout');

const {
    a,
    b,
    operator,
} = putout;

const {replaceWith} = operator;
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

## remove-unused

> A variable is a container for a value, like a `number` we might use in a sum, or a `string` that we might use as part of a sentence.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove the variables that are declared, but:

- not passed as **argument** to a **function**;
- not used as **operand** in **expression**;

That is **unused variables**. Most likely it is a leftovers due to incomplete transforming of the code. Such variables take up space and gives no value so they must be removed.

☝️*Remember, when you [writing a transform](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#readme) you can skip all parts related to **removing unused variables** and just reuse current **plugin** it will make your code simpler and less error prone.*

☝️*No, you cannot just look at [`referenced` and `constant` fields](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#user-content-bindings) to determine if you can remove variable and [here is why](https://putout.cloudcmd.io/#/gist/4277392f74b56b74911b779c9624af8d/cfec476f857dfb4f4c7a6247bdcc6b521fed8e70) one of the biggest plugins exists*.

### ❌ Example of incorrect code

```js
const a = 'hello';
const b = 'world';

console.log(a);
```

### ✅ Example of correct code

```js
const a = 'hello';
console.log(a);
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`remove-unused-variables`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables#readme)| ✅
⏣ **ESLint** | [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars) | ❌

## extract-keywords

> The JavaScript exceptions "unexpected token" occur when the parser does not see a token it recognizes at the given position, so it cannot make sense of the structure of the program. This might be a simple typo.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unexpected_token)

Extract `keywords` from variables. Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fcaedaa9daf7f3a771274aca0da9ab1b/00850a5d28aec86b1b4083ba2ef9f81bd49aaaac).

```diff
-export const isTemplateMiddle = (a) => a?.type === 'TemplateMiddle',
+export const isTemplateMiddle = (a) => a?.type === 'TemplateMiddle';
export const isTemplateTail = (a) => a?.type === 'TemplateTail';

-const a 5;
+const a = 5;

-export const packContent = (content) {
+export const packContent = (content) => {
    console.log(a);
}
```

## License

MIT
