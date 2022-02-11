# @putout/plugin-regexp [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-regexp.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-regexp"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin helps with `Regular Expressions`.

## Install

```
npm i @putout/plugin-regexp -D
```

## Rules

```json
{
    "rules": {
        "regexp/apply-literal-notation": "on",
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
