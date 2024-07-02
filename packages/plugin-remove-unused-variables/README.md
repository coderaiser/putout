# @putout/plugin-remove-unused-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-variables "npm"

> A variable is a container for a value, like a `number` we might use in a sum, or a `string` that we might use as part of a sentence.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove the variables that are declared, but:

- not passed as **argument** to a **function**;
- not used as **operand** in **expression**;

That is **unused variables**. Most likely it is a leftovers due to incomplete transforming of the code. Such variables take up space and gives no value so they must be removed.

☝️*Remember, when you [writing a transform](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#readme) you can skip all parts related to **removing unused variables** and just reuse current **plugin** it will make your code simpler and less error prone.*

☝️*No, you cannot just look at [`referenced` and `constant` fields](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#user-content-bindings) to determine if you can remove variable and [here is why](https://putout.cloudcmd.io/#/gist/4277392f74b56b74911b779c9624af8d/cfec476f857dfb4f4c7a6247bdcc6b521fed8e70) one of the biggest plugins exists*.

## Install

```
npm i @putout/plugin-remove-unused-variables -D
```

## Rule

Rule `remove-unused-variables` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-unused-variables": "off"
    }
}
```

## ❌ Example of incorrect code

```js
const a = 'hello';
const b = 'world';

console.log(a);
```

## ✅ Example of correct code

```js
const a = 'hello';
console.log(a);
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`remove-unused-variables`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables#readme)| ✅
⏣ **ESLint** | [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars) | ❌

## License

MIT
