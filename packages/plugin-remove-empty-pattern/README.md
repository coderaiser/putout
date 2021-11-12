# @putout/plugin-remove-empty-pattern [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-empty-pattern.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-empty-pattern"npm"

`putout` plugin adds ability to find and remove `empty pattern statements`.

## Install

```
npm i @putout/plugin-remove-useless-pattern -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-pattern": "on"
    }
}
```

## ❌ Incorrect code example

```js
const [] = array;
const {} = object;
```

## ✅ Correct code Example

```js
function hi(b) {
}
```

## Remove

### ❌ Incorrect code example

```js
const child_process = require('child_process');
const {
    exec,
    spawn,
} = child_process;
```

### ✅ Correct code Example

```js
const {
    exec,
    spawn,
} = require('child_process');
```

### ✅ Correct code Example

```js
() => {
    const result = transformer.transform(
        realTransformer,
        transformCode,
        code,
        parser,
    );
    
    return result;
};
```

## For-of

### ❌ Incorrect code example

```js
for (const a of b) {
    const {c} = a;
}
```

### ✅ Correct code Example

```js
for (const {c} of b) {
}
```

## License

MIT
