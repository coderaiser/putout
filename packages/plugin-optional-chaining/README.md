# @putout/plugin-optional-chaining [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-optional-chaining.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-optional-chaining "npm"

> The **optional chaining operator** (`?.`) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.
>
> The `?.` operator is like the `.` chaining operator, except that instead of causing an error if a reference is nullish (`null` or `undefined`), the expression short-circuits with a return value of `undefined`. When used with function calls, it returns `undefined` if the given function does not exist.
>
> This results in shorter and simpler expressions when accessing chained properties when the possibility exists that a reference may be missing. It can also be helpful while exploring the content of an object when there's no known guarantee as to which properties are required.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin related to **Optional Chaining**.

## Install

```
npm i @putout/plugin-optional-chaining
```

## Rules

- ✅ [convert-logical-to-optional](#convert-logical-to-optional);
- ✅ [convert-optional-to-logical](#convert-optional-to-logical);
- ✅ [convert-logical-assign-to-optional](#convert-logical-assign-to-optional);
- ✅ [convert-optional-assign-to-logical](#convert-logical-assign-to-optional);

## Config

```json
{
    "rules": {
        "optional-chaining/convert-logical-to-optional": "on",
        "optional-chaining/convert-optional-assign-to-logical": "on",
        "optional-chaining/convert-logical-assign-to-optional": "off",
        "optional-chaining/convert-optional-to-logical": "off"
    }
}
```

## convert-logical-to-optional

> The logical **AND** (`&&`) (logical conjunction) operator for a set of boolean operands will be true if and only if all the operands are true. Otherwise it will be false.
>
> More generally, the operator returns the value of the first falsy operand encountered when evaluating from left to right, or the value of the last operand if they are all truthy.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)

Checkout out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d308302b95800920d324b799f1a948e3/99d03cb297d17446885829e8583b3cc7777367c5).

### ❌ Example of incorrect code

```js
const result = hello && hello.world;

if (typeof a === 'function' && a(1, 2))
    alert();
```

### ✅ Example of correct code

```js
const result = hello?.world;

if (a?.(1, 2))
    alert();
```

## convert-logical-assign-to-optional

> Proposal to add support for optional chaining on the left of assignment operators: `a?.b = c`.
>
> (c) [Proposal of Optional Chaining Assignment](https://github.com/tc39/proposal-optional-chaining-assignment)

Disabled by default. Checkout out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/74bde454f909b7f9d13e80da10e12a15/d31bd20ca18fefe474bb8ab73f963e47dffb89e7).

### ❌ Example of incorrect code

```js
if (a) {
    a.b = 5;
}

if (a)
    a.b = 5;

a && (a.b = 5);
```

### ✅ Example of correct code

```js
a?.b = 5;
```

## convert-optional-assign-to-logical

> The JavaScript exception "invalid assignment left-hand side" occurs when there was an unexpected assignment somewhere. It may be triggered when a single `=` sign was used instead of `==` or `===`.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Invalid_assignment_left-hand_side)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/29c00f1b02b592a3dcd7b7e185dfd354/50a1a416da21b02df3a76954b4d7a1ff7dac1eaf).

### ❌ Example of incorrect code

```js
maybeAnObj?.prop = theValue;
```

### ✅ Example of correct code

```js
maybeAnObj && (maybeAnObj.prop = theValue);
```

## convert-optioanl-to-logical

Disabled by default.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e0a4ccb41708ad37e34d527a978ebb88/482f15c954cdaa35e37da7a1dddb82338d7e93a2).

### ❌ Example of incorrect code

```js
hello?.world?.();
```

### ✅ Example of correct code

```js
hello && hello.world && hello.world();
```

## License

MIT
