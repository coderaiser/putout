# @putout/plugin-remove-nested-blocks [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-nested-blocks.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-nested-blocks "npm"

> Delimited by a pair of curly brackets **block statement** is used to group zero or more statements.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove **nested bocks**.

☝️*Remember, when you [writing a transform](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#readme) you can skip all parts related to **removing nested blocks** and just reuse current **plugin** it will make your code simpler and less error prone.*

## Install

```
npm i @putout/plugin-remove-nested-blocks
```

## Rule

```json
{
    "rules": {
        "remove-nested-blocks": "on"
    }
}
```

## ❌ Example of incorrect code

```js
for (const x of Object.keys(a)) {
    {
        console.log(x);
        console.log(xxx);
    }
}
```

## ✅ Example of correct code

```js
for (const x of Object.keys(a)) {
    console.log(x);
    console.log(xxx);
}

switch(x) {
case 1: {
    const m = 5;
}
}
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`remove-nested-blocks`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-nested-blocks#readme)| ✅
⏣ **ESLint** | [`no-lone-blocks`](https://eslint.org/docs/rules/no-lone-blocks) | ❌

## License

MIT
