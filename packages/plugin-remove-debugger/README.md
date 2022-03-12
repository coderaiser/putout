# @putout/plugin-remove-debugger [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-debugger "npm"

> The `debugger` statement invokes any available debugging functionality, such as setting a **breakpoint**. If no debugging functionality is available, this statement has no effect.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove `debugger` statement.

## Install

```
npm i @putout/plugin-remove-debugger
```

## Rule

```json
{
    "rules": {
        "remove-debugger": "on"
    }
}
```

## ❌ Example of incorrect code

```js
debugger;
console.log('hello');
```

## ✅ Example of correct code

```js
console.log('hello');
```

## License

MIT
