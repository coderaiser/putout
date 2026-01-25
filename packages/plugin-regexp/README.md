# @putout/plugin-regexp [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-regexp.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-regexp "npm"

> Regular expressions are patterns used to match character combinations in strings.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with **Regular Expressions**.

## Install

```
npm i @putout/plugin-regexp -D
```

## Rules

- ✅ [apply-character-class](#apply-character-class);
- ✅ [apply-ends-with](#apply-ends-with);
- ✅ [apply-global-regexp-to-replace-al](#apply-global-regexp-to-replace-all);
- ✅ [apply-literal-notation](#apply-literal-notation);
- ✅ [apply-starts-with](#apply-starts-with);
- ✅ [convert-replace-to-replace-all](#convert-replace-to-replace-all);
- ✅ [convert-to-string](#convert-to-string);
- ✅ [optimize](#optimize);
- ✅ [remove-useless-group](#remove-useless-group);
- ✅ [remove-useless-regexp](#remove-useless-regexp);
- ✅ [remove-useless-escape](#remove-useless-escape);
- ✅ [remove-duplicates-from-character-class](#remove-duplicates-from-character-class);

## Config

```json
{
    "rules": {
        "regexp/apply-character-class": "on",
        "regexp/apply-global-regexp-to-replace-all": "on",
        "regexp/apply-literal-notation": "on",
        "regexp/apply-starts-with": "on",
        "regexp/apply-ends-with": "on",
        "regexp/optimize": "on",
        "regexp/convert-to-string": "on",
        "regexp/convert-replace-to-replace-all": "on",
        "regexp/remove-useless-group": "on",
        "regexp/remove-useless-escape": "on",
        "regexp/remove-useless-regexp": "on",
        "regexp/remove-duplicates-from-character-class": "on"
    }
}
```

## optimize

### ❌ Example of incorrect code

```js
const a = /(ab|ab)/;
```

### ✅ Example of correct code

```js
const a = /(ab)/;
```

## apply-character-class

Checkout in:

- 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/af6302761114152dee215625ff411825/fb2a0589b29d80a7c76fb05eb9ace66511a5e8bb).
- [AST Explorer](https://astexplorer.net/#/gist/86288d07002d1151c7eac529c0b85f1e/ad57c586193f19e56d07b1d18725ec969388dde2).

### ❌ Example of incorrect code

```js
/\)|\(/g;
```

### ✅ Example of correct code

```js
/[)(]/g;
```

## apply-global-regexp-to-replace-all

> `Uncaught TypeError: String.prototype.replaceAll called with a non-global RegExp argument`
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Requires_global_RegExp)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/8c759e3c8d19d660ddb01bda04d75c8b/f1d0f3a6d491f034308f5f3a375900b0a620a3b3).

### ❌ Example of incorrect code

```js
's'.replaceAll(/hello/, 's');
'abc'.matchAll(/./);
```

### ✅ Example of correct code

```js
's'.replaceAll(/hello/g, 's');
'abc'.matchAll(/./g);
```

## apply-literal-notation

### ❌ Example of incorrect code

```js
const a = new RegExp('hello', 'i');
```

### ✅ Example of correct code

```js
const a = /hello/i;
```

## apply-starts-with

> The `startsWith()` method determines whether a string begins with the characters of a specified string, returning `true` or `false` as appropriate.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)

**RegExp** is overkill for such a simple task as determining that string located at the beginning. Check it out in 🐊 [**Putout Editor**](https://putout.cloudcmd.io/#/gist/79e3e41c3491fb8c45fb03580e42ef20/89971d2d6528ee78df4c2a0d6271179560f76cc1).

### ❌ Example of incorrect code

```js
/^hello/.test(a);
```

### ✅ Example of correct code

```js
a.startsWith('hello');
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`regexp/apply-starts-with`](https://github.com/coderaiser/putout/tree/master/packages/plugin-regexp#apply-starts-with)| ✅
🦕 **TypeScript ESLint** | [`prefer-string-starts-ends-with`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md#prefer-string-starts-ends-with) | ✅

## apply-ends-with

> The `startsWith()` method determines whether a string ends with the characters of a specified string, returning `true` or `false` as appropriate.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)

**RegExp** is overkill for such a simple task as determining that string located at the end.

### ❌ Example of incorrect code

```js
/hello$/.test(a);
```

### ✅ Example of correct code

```js
a.endsWith('hello');
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`regexp/apply-ends-with`](https://github.com/coderaiser/putout/tree/master/packages/plugin-regexp#apply-ends-with)| ✅
🦕 **TypeScript ESLint** | [`prefer-string-starts-ends-with`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md#prefer-string-starts-ends-with) | ✅

## convert-to-string

### ❌ Example of incorrect code

```js
'hello'.replace(/hello/, 'world');
```

### ✅ Example of correct code

```js
'hello'.replace('hello', 'world');
```

## convert-replace-to-replace-all

Simplify code according to [string-replace-all](https://github.com/tc39/proposal-string-replaceall).

### ❌ Example of incorrect code

```js
'hello'.replace(/hello/g, 'world');
```

### ✅ Example of correct code

```js
'hello'.replaceAll('hello', 'world');
```

## remove-useless-group

### ❌ Example of incorrect code

```js
/(hello)/.test(str);
```

### ✅ Example of correct code

```js
/hello/.test(str);
```

## remove-useless-escape

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/af9d1c774c3691aface974406717b32a/e9fc8a985e0195ecc27d70c748e5d4497be91265).

### ❌ Example of incorrect code

```js
const cleanText = code.replaceAll(/[,;\(\)]/g, '');
```

### ✅ Example of correct code

```js
const cleanText = code.replaceAll(/[,;()]/g, '');
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`regexp/remove-useless-escape`](https://github.com/coderaiser/putout/tree/master/packages/plugin-regexp/#remove-useless-escape)| ✅
⏣ **ESLint** | [`no-useless-escape`](https://eslint.org/docs/rules/no-useless-escape) | ❌

## remove-useless-regexp

### ❌ Example of incorrect code

```js
const a = /^\.hello$/.test(str);
```

### ✅ Example of correct code

```js
const a = str === '.hello';
```

## remove-duplicates-from-character-class

Checkout in [AST Explorer](https://astexplorer.net/#/gist/634783e99f6a9432e375ac8ad96647d9/a889735af932bd9f88f953596bec80d3a714415f).

### ❌ Example of incorrect code

```js
/[aaabb]/.test(str);
```

### ✅ Example of correct code

```js
/[ab]/.test(str);
```

## License

MIT
