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

### ❌ Example of incorrect code

```js
function hi(a) {
    const b = a;
}
```

### ✅ Example of correct code

```js
function hi(b) {
}
```

## Destruct

### ❌ Example of incorrect code

```js
function hi(c) {
    const {a, b} = c;
}
```

### ✅ Example of correct code

```js
function hi({a, b}) {
}
```

## Remove

### ❌ Example of incorrect code

```js
const child_process = require('child_process');
const {
    exec,
    spawn,
} = child_process;
```

### ✅ Example of correct code

```js
const {
    exec,
    spawn,
} = require('child_process');
```

## await

### ❌ Example of incorrect code

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

### ✅ Example of correct code

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

### ❌ Example of incorrect code

```js
for (const a of b) {
    const {c} = a;
}
```

### ✅ Example of correct code

```js
for (const {c} of b) {
}
```

## License

MIT
