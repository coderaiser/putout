# @putout/plugin-apply-optional-chaining [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-optional-chaining.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-optional-chaining "npm"

> The **optional chaining operator** (`?.`) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.
>
> The `?.` operator is like the `.` chaining operator, except that instead of causing an error if a reference is nullish (`null` or `undefined`), the expression short-circuits with a return value of `undefined`. When used with function calls, it returns `undefined` if the given function does not exist.
>
> This results in shorter and simpler expressions when accessing chained properties when the possibility exists that a reference may be missing. It can also be helpful while exploring the content of an object when there's no known guarantee as to which properties are required.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin applies **optional chaining**. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d308302b95800920d324b799f1a948e3/99d03cb297d17446885829e8583b3cc7777367c5).

## Install

```
npm i @putout/plugin-apply-optional-chaining
```

## Rule

```json
{
    "rules": {
        "apply-optional-chaining": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const result = hello && hello.world;

if (typeof a === 'function' && a(1, 2))
    alert();
```

## ✅ Example of correct code

```js
const result = hello?.world;

if (a?.(1, 2))
    alert();
```

## License

MIT
