# @putout/plugin-split-assignment-expressions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-split-assignment-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-split-assignment-expressions "npm"

> The assignment (`=`) operator is used to assign a value to a variable or property. The assignment expression itself has a value, which is the assigned value. This allows multiple assignments to be chained in order to assign a single value to multiple variables.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and split variable declarations because (re)moving a line is simpler and less error prone then changing coma (`=`) to colon (`;`).

For the same reason, **diff** of changed declarations are more comfortable to read. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fee33133e2313c3a741193570e307a58/f8fae66c93acc546194df49fff2a5fc13de8434c).

## Install

```
npm i @putout/plugin-split-assignment-expressions
```

## Rule

```json
{
    "rules": {
        "split-assignment-expressions": "on"
    }
}
```

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
