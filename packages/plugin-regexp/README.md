# @putout/plugin-regexp [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-regexp.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-regexp"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-regexp
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-regexp

`putout` plugin helps with `Regular Expressions`.

## Install

```
npm i @putout/plugin-regexp -D
```

## Rules

```json
{
    "rules": {
        "regexp/simplify": "on",
        "regexp/convert-to-string": "on",
        "regexp/convert-replace-to-replace-all": "on"
    }
}
```

## regexp/simplify

### ❌ Incorrect code example

```js
const a = /(ab|ab)/;
```

### ✅ Correct code Example

```js
const a = /(ab)/;
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

### ❌ Incorrect code example

```js
'hello'.replace(/hello/g, 'world');
```

### ✅ Correct code Example

```js
'hello'.replaceAll('hello', 'world');
```

## License

MIT

