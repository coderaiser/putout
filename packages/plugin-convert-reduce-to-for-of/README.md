# @putout/plugin-convert-reduce-to-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-reduce-to-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-reduce-to-for-of "npm"

> - The [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method executes a user-supplied **reducer** callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.
>
> - The [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement creates a loop which invokes a custom iteration hook with statements to be executed for the value of each element of an array.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `.reduce()` to `for...of` loop.
You should always look at second argument of a **reducer** since it changes logic drastically and should read back and forth a couple times to understand what is going on.

> Recursive functions like `.reduce()` can be powerful but sometimes difficult to understand, especially for less experienced **JavaScript** developers. If code becomes clearer when using other array methods, developers must weigh the readability tradeoff against the other benefits of using `.reduce()`. In cases where `.reduce()` is the best choice, documentation and semantic variable naming can help mitigate readability drawbacks.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#when_to_not_use_reduce)

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/107751499a4bbdd83b9181444d8bdbbd/8d3b646a3df0025d564e2bb141cc7f6a6bb1b3a5).

## Install

```
npm i @putout/plugin-convert-reduce-to-for-of -D
```

## Rule

```json
{
    "rules": {
        "convert-reduce-to-for-of": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const result = list.reduce((a, b) => a + b, 1);
```

## ✅ Example of correct code

```js
let sum = 1;

for (const a of list) {
    sum += a;
}
```

## License

MIT
