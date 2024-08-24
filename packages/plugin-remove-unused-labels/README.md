# @putout/plugin-remove-unused-labels [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-labels.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-labels "npm"

> A **labeled statement** is any statement that is prefixed with an identifier. You can jump to this label using a `break` or `continue` statement nested within the labeled statement.>
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove unused `label` statement.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/021bf8fa6f01bcc265cebbaa19d5dffc/1833eaee02119cf1d38974157a8d010ecaed7b33).

## Install

```
npm i @putout/plugin-remove-unused-labels
```

## Rule

```json
{
    "rules": {
        "remove-unused-labels": "on"
    }
}
```

## ❌ Example of incorrect code

```js
hello: while (true) {
    break;
}
```

## ✅ Example of correct code

```js
while (true) {
    break;
}
```

## Comparison

| Linter        | Rule                                                                                                                   | Fix |
|---------------|------------------------------------------------------------------------------------------------------------------------|-----|
| 🐊 **Putout** | [`remove-unused-labels`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-labels#readme) | ✅   |
| ⏣ **ESLint**  | [`no-unused-labels`](https://eslint.org/docs/rules/no-unused-labels)                                                   | ❌   |
| 🦕 **Deno**   | [`no-unused-labels`](https://lint.deno.land/rules/no-unused-labels)                                                    | ❌   |

## License

MIT
