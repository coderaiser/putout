# @putout/plugin-remove-useless-push [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-push.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-push "npm"

> The `push()` method of `Array` instances adds the specified elements to the end of an array and returns the new length of the array.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `push()`. The rule fits good with  [`putout/remove-unused-variables`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables#readme).

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/edebc3873f4b2ea6d99cfb957814bc63/603eed77455010519c1127490267888e3f6576a8).

## Install

```
npm i @putout/plugin-remove-useless-push
```

## Rule

```json
{
    "rules": {
        "remove-useless-push": "on"
    }
}
```

## ❌ Example of incorrect code

```js
function get() {
    const a = [];
    const b = [];
    
    a.push(1);
    b.push(2);
    
    return b;
}
```

## ✅ Example of correct code

```js
function get() {
    const a = [];
    const b = [];
    
    b.push(2);
    
    return b;
}
```

## License

MIT
