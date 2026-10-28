# @putout/plugin-apply-template-literals [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-template-literals.svg?style=flat\&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-template-literals "npm"

> Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
> Template literals are sometimes informally called template strings, because they are used most commonly for string interpolation (to create strings by doing substitution of placeholders
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `template literals`. Check out in [🐊**Putout Editor**](https://putout.cloudcmd.io/#/gist/a3943037348a9f5ff100a972f8e83d9f/718a8997a89790e7fa507114dc1f4984637e92d4).

## Install

```
npm i @putout/plugin-apply-template-literals
```

## Rule

```json
{
    "rules": {
        "apply-template-literals": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const line = '("' + name + '")';
```

## ✅ Example of correct code

```js
const line = `("${name}")`;
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`apply-template-literals`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-template-literals#readme) | ✅
⏣ **ESLint** | [`prefer-template`](https://eslint.org/docs/latest/rules/prefer-template) | ✅

## License

MIT
