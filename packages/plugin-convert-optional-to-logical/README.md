# @putout/plugin-convert-optional-to-logical [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-optional-to-logical.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-optional-to-logical "npm"

> The **optional chaining operator** (`?.`) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.
>
> The `?.` operator is like the `.` chaining operator, except that instead of causing an error if a reference is nullish (`null` or `undefined`), the expression short-circuits with a return value of `undefined`. When used with function calls, it returns `undefined` if the given function does not exist.
>
> This results in shorter and simpler expressions when accessing chained properties when the possibility exists that a reference may be missing. It can also be helpful while exploring the content of an object when there's no known guarantee as to which properties are required.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

> The logical **AND** (`&&`) (logical conjunction) operator for a set of boolean operands will be true if and only if all the operands are true. Otherwise it will be false.
>
> More generally, the operator returns the value of the first falsy operand encountered when evaluating from left to right, or the value of the last operand if they are all truthy.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert **Optioncal Chaining** to **Logical Expression**.
Like [`apply-optional-chaining`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-optional-chaining#readme) but backwards.

## Install

```
npm i @putout/plugin-convert-optional-to-logical
```

## Configuration

```json
{
    "rules": {
        "convert-optional-to-logical/assign": "on",
        "convert-optional-to-logical/call": "on"
    }
}
```

## assign

> The JavaScript exception "invalid assignment left-hand side" occurs when there was an unexpected assignment somewhere. It may be triggered when a single `=` sign was used instead of `==` or `===`.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Invalid_assignment_left-hand_side)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e0a4ccb41708ad37e34d527a978ebb88/482f15c954cdaa35e37da7a1dddb82338d7e93a2).

### ❌ Example of incorrect code

```js
maybeAnObj?.prop = theValue;
```

### ✅ Example of correct code

```js
maybeAnObj && (maybeAnObj.prop = theValue);
```

## call

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
