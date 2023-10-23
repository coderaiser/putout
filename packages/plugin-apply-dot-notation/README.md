# @putout/plugin-apply-dot-notation [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-dot-notation.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-dot-notation "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply dot notation. Checkout out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d0702a7f5765c0f26788be18296eefca/a33f4501ce1e6018e6bb1b52ae0f554cb4483a05).

> Property accessors provide access to an object's properties by using the dot notation or the bracket notation.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)

## Install

```
npm i @putout/plugin-apply-dot-notation
```

## Rule

```json
{
    "rules": {
        "apply-dot-notation": "on"
    }
}
```

## ❌ Example of incorrect code

```js
a.hello.world;
```

## ✅ Example of correct code

```js
a.hello.world;
a[1];
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`apply-dot-notation`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-dot-notation#readme) | ✅
⏣ **ESLint** | [`dot-notation`](https://eslint.org/docs/latest/rules/dot-notation) | ✅
📖 **Blog** | [`Converting-Bracket-Notation-Dot-Notation`](https://steakenthusiast.github.io/2022/05/28/Deobfuscating-Javascript-via-AST-Manipulation-Converting-Bracket-Notation-Dot-Notation-for-Property-Accessors/) | ✅

## License

MIT
