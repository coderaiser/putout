# @putout/plugin-apply-push [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-push.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-push "npm"

> The `push()` method of `Array` instances adds the specified elements to the end of an array and returns the new length of the array.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

> The `bind()` method of `Function` instances creates a new function that, when called, calls this function with its this keyword set to the provided value, and a given sequence of arguments preceding any provided when the new function is called.

> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `push()` bind.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/edebc3873f4b2ea6d99cfb957814bc63/603eed77455010519c1127490267888e3f6576a8).

## Install

```
npm i @putout/plugin-apply-push
```

## Rule

```json
{
    "rules": {
        "apply-push": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const nextActions = [];
const dispatch = createMiddleware(store)((a) => nextActions.push(a));
```

## ✅ Example of correct code

```js
const nextActions = [];
const push = nextActions.push.bind(nextActions);
const dispatch = createMiddleware(store)(push);
```

## License

MIT
