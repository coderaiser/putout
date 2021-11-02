# @putout/plugin-regexp [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-regexp.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-regexp"npm"

`putout` plugin helps with `Regular Expressions`.

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

### ❌ Incorrect code example

```js
const a = /(ab|ab)/;
```

### ✅ Correct code Example

```js
const a = /(ab)/;
```

## regexp/apply-literal-notation

### ❌ Incorrect code example

```js
const a = new RegExp('hello', 'i');
```

### ✅ Correct code Example

```js
const a = /hello/i;
```

## regexp/convert-to-string

### ❌ Incorrect code example

```js
'hello'.replace(/hello/, 'world');
```

### ✅ Correct code Example

```js
'hello'.replace('hello', 'world');
```

## regexp/convert-replace-to-replace-all

Simplify code according to [string-replace-all](https://github.com/tc39/proposal-string-replaceall).

### ❌ Incorrect code example

```js
'hello'.replace(/hello/g, 'world');
```

### ✅ Correct code Example

```js
'hello'.replaceAll('hello', 'world');
```

## regexp/remove-useless-group

### ❌ Incorrect code example

```js
/(hello)/.test(str);
```

### ✅ Correct code Example

```js
/hello/.test(str);
```

## regexp/remove-useless-regexp

### ❌ Incorrect code example

```js
const a = /^\.hello$/.test(str);
```

### ✅ Correct code Example

```js
const a = str === '.hello';
```

## License

MIT
