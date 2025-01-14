# @putout/plugin-merge-return-with-next-sibling [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-merge-return-with-next-sibling.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-merge-return-with-next-sibling "npm"

> The `return` statement ends function execution and specifies a value to be returned to the function caller.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and merge `return` with next sibling. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2cb7e8836ce0adb6009f21859f8a0c15/9eea5b36a4f6664b05f2f9f0abd271a62a4dbbbe).

## Install

```
npm i @putout/plugin-merge-return-with-next-sibling
```

## Rule

```json
{
    "rules": {
        "merge-return-with-next-sibling": "on"
    }
}
```

## ❌ Example of incorrect code

```js
function x() {
    return
    {
        hello: 'world';
    }
    
    return
    5;
    
    return
    a ? 2 : 3;
}
```

## ✅ Example of correct code

```js
function x() {
    return {
        hello: 'world',
    };
    
    return 5;
    
    return a ? 2 : 3;
}
```

## License

MIT
