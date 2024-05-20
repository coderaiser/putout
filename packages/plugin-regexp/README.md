# @putout/plugin-regexp [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-regexp.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-regexp"npm"

> Regular expressions are patterns used to match character combinations in strings.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with **Regular Expressions**.

## Install

```
npm i @putout/plugin-regexp -D
```

## Rules

- ✅ [apply-ends-with](#apply-ends-with);
- ✅ [apply-literal-notation](#apply-literal-notation);
- ✅ [apply-starts-with](#apply-starts-with);
- ✅ [convert-replace-to-replace-all](#convert-replace-to-replace-all);
- ✅ [convert-to-string](#convert-to-string);
- ✅ [optimize](#optimize);
- ✅ [remove-useless-group](#remove-useless-group);
- ✅ [remove-useless-regexp](#remove-useless-regexp);
- ✅ [types.js](#types.js);

## Config

```json
{
    "rules": {
        "regexp/apply-literal-notation": "on",
        "regexp/apply-starts-with": "on",
        "regexp/apply-ends-with": "on",
        "regexp/optimize": "on",
        "regexp/convert-to-string": "on",
        "regexp/convert-replace-to-replace-all": "on",
        "regexp/remove-useless-group": "on",
        "regexp/remove-useless-regexp": "on"
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

## remove-useless-regexp

### ❌ Example of incorrect code

```js
const a = /^\.hello$/.test(str);
```

### ✅ Example of correct code

```js
const a = str === '.hello';
```

## License

MIT
