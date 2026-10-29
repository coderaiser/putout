# @putout/plugin-merge-duplicate-functions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-merge-duplicate-functions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-merge-duplicate-functions "npm"

> Functions are one of the fundamental building blocks in JavaScript. A function in JavaScript is similar to a procedure—a set of statements that performs a task or calculates a value, but for a procedure to qualify as a function, it should take some input and return an output where there is some obvious relationship between the input and the output. To use a function, you must define it somewhere in the scope from which you wish to call it.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and merge duplicate functions. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2cb7e8836ce0adb6009f21859f8a0c15/9eea5b36a4f6664b05f2f9f0abd271a62a4dbbbe).

## Install

```
npm i @putout/plugin-merge-duplicate-functions
```

## Rule

```json
{
    "rules": {
        "merge-duplicate-functions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const isFn = (a) => typeof a === 'function';
const isFn1 = (a) => typeof a === 'function';
const isFn2 = (a) => typeof a === 'function';

isFn(1);
isFn1(2);
```

## ✅ Example of correct code

```js
const isFn = (a) => typeof a === 'function';

isFn(1);
isFn(2);
```

## License

MIT
