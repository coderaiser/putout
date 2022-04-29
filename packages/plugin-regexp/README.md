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

```json
{
    "rules": {
        "regexp/apply-literal-notation": "on",
        "regexp/apply-starts-with": "on",
        "regexp/optimize": "on",
        "regexp/convert-to-string": "on",
        "regexp/convert-replace-to-replace-all": "on",
        "regexp/remove-useless-group": "on",
        "regexp/remove-useless-regexp": "on"
    }
}
```

## regexp/optimize

### ❌ Example of incorrect code

```js
const a = /(ab|ab)/;
```

### ✅ Example of correct code

```js
const a = /(ab)/;
```

## regexp/apply-literal-notation

### ❌ Example of incorrect code

```js
const a = new RegExp('hello', 'i');
```

### ✅ Example of correct code

```js
const a = /hello/i;
```

## regexp/apply-starts-with

> The `startsWith()` method determines whether a string begins with the characters of a specified string, returning `true` or `false` as appropriate.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)

**RegExp** is overkill for such a simple task as determining that string located at the beginning. Check it out in 🐊 [**Putout Editor**](https://putout.cloudcmd.io/#/gist/79e3e41c3491fb8c45fb03580e42ef20/89971d2d6528ee78df4c2a0d6271179560f76cc1)*

### ❌ Example of incorrect code

```js
/^hello/.test(a);
```

### ✅ Example of correct code

```js
a.startsWith('hello');
```

## regexp/convert-to-string

### ❌ Example of incorrect code

```js
'hello'.replace(/hello/, 'world');
```

### ✅ Example of correct code

```js
'hello'.replace('hello', 'world');
```

## regexp/convert-replace-to-replace-all

Simplify code according to [string-replace-all](https://github.com/tc39/proposal-string-replaceall).

### ❌ Example of incorrect code

```js
'hello'.replace(/hello/g, 'world');
```

### ✅ Example of correct code

```js
'hello'.replaceAll('hello', 'world');
```

## regexp/remove-useless-group

### ❌ Example of incorrect code

```js
/(hello)/.test(str);
```

### ✅ Example of correct code

```js
/hello/.test(str);
```

## regexp/remove-useless-regexp

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
