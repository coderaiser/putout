# @putout/plugin-labels [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-labels.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-labels "npm"

> A **labeled statement** is any `statement` that is prefixed with an `identifier`. You can jump to this label using a `break` or `continue` statement nested within the labeled statement.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove unused `label` statement.

## Install

```
npm i @putout/plugin-labels -D
```

## Rules

- ✅ [add-missing-async](#add-missing-async);
- ✅ [remove-unused](#remove-unused);

## Config

```json
{
    "rules": {
        "labels/convert-to-object": "on",
        "labels/remove-unused": "on"
    }
}
```

☝️ If you want to override any of it, update `.putout.json` in the directory near your files.

[🦉 Configuration](https://github.com/coderaiser/putout#-configuration) section of 🐊**Putout** documentation tell you more about all configuration options supported.

## convert-to-object

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/86e2915cc2cffb6c26dd3bc2f2379a71/605562cf1fdf77a7918792955601e6767a805050).

### ❌ Example of incorrect code

```js
const a = () => {
    hello: 'world';
    x: 'm';
};
```

### ✅ Example of correct code

```js
const a = () => ({
    hello: 'world',
    x: 'm',
});
```

## remove-unused

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/021bf8fa6f01bcc265cebbaa19d5dffc/1833eaee02119cf1d38974157a8d010ecaed7b33).

### ❌ Example of incorrect code

```js
hello: while (true) {
    break;
}
```

### ✅ Example of correct code

```js
while (true) {
    break;
}
```

### Comparison

| Linter        | Rule | Fix |
|---------------|------|-----|
| 🐊 **Putout** | [`remove-unused-labels`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-labels#readme) | ✅   |
| ⏣ **ESLint**  | [`no-unused-labels`](https://eslint.org/docs/rules/no-unused-labels) | ❌   |
| 🦕 **Deno**   | [`no-unused-labels`](https://lint.deno.land/rules/no-unused-labels) | ❌   |

## License

MIT
