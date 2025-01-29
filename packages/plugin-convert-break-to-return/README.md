# @putout/plugin-convert-break-to-return [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-break-to-return.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-break-to-return "npm"

> The `break` statement terminates the current loop or switch statement and transfers program control to the statement following the terminated statement.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

> `SyntaxError: unlabeled break must be inside loop or switch`
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_break)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `break` to `return`. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a321ee4d76a066c17835b4aa50f91499/10646f7383b8d58cda02417485d5281955da95be).

## Install

```
npm i @putout/plugin-convert-break-to-return -D
```

## Rule

```json
{
    "rules": {
        "convert-break-to-return": "on"
    }
}
```

## ❌ Example of incorrect code

```ts
function x() {
    if (a)
        break;
    
    return false;
}
```

## ✅ Example of correct code

```js
function x() {
    if (a)
        return;
    
    return false;
}
```

## License

MIT
