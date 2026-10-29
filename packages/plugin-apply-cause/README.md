# @putout/plugin-apply-cause [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-cause.svg?style=flcause&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-cause "npm"

> The `cause` data property of an Error instance indicates the specific original cause of the error.:
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `cause`

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/7f13036172975d7b27cf371a9fbb5e8c/4db40fe32bfdc4f8475692ba139608298f15605f).

## Install

```
npm i @putout/plugin-apply-cause
```

## Rule

```json
{
    "rules": {
        "apply-cause": "on"
    }
}
```

## ❌ Example of incorrect code

```js
try {} catch(error) {
    if (controller.signal.aborted)
        throw Error('timeout');
}
```

## ✅ Example of correct code

```js
try {} catch(error) {
    if (controller.signal.aborted)
        throw Error('timeout', {
            cause: error,
        });
}
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`apply-cause`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-cause#readme) | ✅
⏣ **ESLint** | [`apply-cause`](https://eslint.org/docs/rules/https://eslint.org/docs/latest/rules/preserve-caught-error) | ❌

## License

MIT
