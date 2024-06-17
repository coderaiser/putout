# @putout/plugin-convert-assignment-to-declaration [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-assignment-to-declaration.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-assignment-to-declaration "npm"

> The assignment (`=`) operator is used to assign a value to a variable or property.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment)

> The `const` declaration declares block-scoped local variables. The value of a constant can't be changed through reassignment using the assignment operator, but if a constant is an object, its properties can be added, updated, or removed.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `assignment` to `declaration`.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/857e6bdc83dc2ee947b2945f6600d417/34d1c3852d85225da7eabdf9b91c138b7533c60b).

## Install

```
npm i @putout/plugin-convert-assignment-to-declaration -D
```

## Rule

```json
{
    "rules": {
        "convert-assignment-to-declaration": "on"
    }
}
```

## ❌ Example of incorrect code

```js
a = 5;
```

## ✅ Example of correct code

```js
const a = 5;
```

## License

MIT
