# @putout/plugin-remove-useless-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-variables "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove `useless variables`.

## Install

```
npm i @putout/plugin-remove-useless-variables -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-variables/rename": "on",
        "remove-useless-variables/destruct": "on",
        "remove-useless-variables/remove": "on",
        "remove-useless-variables/await": "on",
        "remove-useless-variables/for-of": ["on", {
            "maxProperties": 4
        }]
    }
}
```

## Rename

### ❌ Incorrect code example

```js
function hi(a) {
    const b = a;
}
```

### ✅ Correct code Example

```js
function hi(b) {
}
```

## Destruct

### ❌ Incorrect code example

```js
function hi(c) {
    const {a, b} = c;
}
```

### ✅ Correct code Example

```js
function hi({a, b}) {
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

## await

### ❌ Incorrect code example

```js
async () => {
    const result = transformer.transform(
        realTransformer,
        transformCode,
        code,
        parser,
    );
    
    const result2 = await Promise.resolve(result);
    
    return result2;
};
```

### ✅ Correct code Example

```js
async () => {
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
