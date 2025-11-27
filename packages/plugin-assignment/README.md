# @putout/plugin-assignment [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-assignment.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-assignment "npm"

> The [**assignment operator**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment) (`=`) is used to assign a value to a variable. The assignment operation evaluates to the assigned value. Chaining the assignment operator is possible in order to assign a single value to multiple variables.

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform to new **Node.js** API and apply best practices.

## Install

```
npm i putout @putout/plugin-assignment -D
```

## Rules

- ✅ [convert-to-arrow-function](#convert-to-arrow-function);
- ✅ [convert-to-comparison](#convert-to-comparison);
- ✅ [convert-to-declaration](#convert-to-declaration);
- ✅ [simplify](#simplify);
- ✅ [split](#split);

## Config

```json
{
    "rules": {
        "assignment/convert-to-arrow-function": "on",
        "assignment/convert-to-comparison": "on",
        "assignment/convert-to-declaration": "on",
        "assignment/simplify": "on",
        "assignment/split": "on"
    }
}
```

## convert-to-arrow-function

> An [**arrow function expression**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) is a compact alternative to a **function expression**.
>
> (c) MDN

Rule adds ability to convert **assignment** to **arrow** function.

### ❌ Example of incorrect code

```js
const createRegExp = a = RegExp(a, 'g');
```

### ✅ Example of correct code

```js
const createRegExp = (a) => RegExp(a, 'g');
```

## convert-to-comparison

> You should almost never have an `if...else` with an assignment like `a = b` as a condition.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

### ❌ Example of incorrect code

```js
if (a = b) {}
```

### ✅ Example of correct code

```js
if (a === b) {}
```

## convert-to-declaration

> The `const` declaration declares block-scoped local variables. The value of a constant can't be changed through reassignment using the assignment operator, but if a constant is an object, its properties can be added, updated, or removed.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/857e6bdc83dc2ee947b2945f6600d417/34d1c3852d85225da7eabdf9b91c138b7533c60b).

## ❌ Example of incorrect code

```js
a = 5;
```

## ✅ Example of correct code

```js
const a = 5;
```

## simplify

### ❌ Example of incorrect code

```js
const {a} = {
    a: 5,
};

const [b] = [5];
const c = (() => 7)();
```

### ✅ Example of correct code

```js
const a = 5;
const b = 5;
const c = 7;
```

## split

Rule adds ability to find and split variable declarations because (re)moving a line is simpler and less error prone then changing coma (`=`) to colon (`;`).

For the same reason, **diff** of changed declarations are more comfortable to read. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fee33133e2313c3a741193570e307a58/f8fae66c93acc546194df49fff2a5fc13de8434c).

## ❌ Example of incorrect code

```js
a = b = c = 1;
```

## ✅ Example of correct code

```js
a = 1;
b = a;
c = a;
```

## License

MIT
