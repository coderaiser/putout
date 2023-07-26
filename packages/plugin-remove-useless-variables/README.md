# @putout/plugin-remove-useless-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-variables "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove `useless variables`.

## Install

```
npm i @putout/plugin-remove-useless-variables -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-variables/rename": "on",
        "remove-useless-variables/remove": "on",
        "remove-useless-variables/destruct": "on",
        "remove-useless-variables/await": "on",
        "remove-useless-variables/declaration": "on"
    }
}
```

## rename

### ❌ Example of incorrect code

```js
function hi(a) {
    const b = a;
}
```

### ✅ Example of correct code

```js
function hi(b) {}
```

## destruct

### ❌ Example of incorrect code

```js
function hi(c) {
    const {a, b} = c;
}
```

### ✅ Example of correct code

```js
function hi({a, b}) {}
```

## remove

### ❌ Example of incorrect code

```js
const child_process = require('child_process');

const {exec, spawn} = child_process;
```

### ✅ Example of correct code

```js
const {exec, spawn} = require('child_process');
```

### remove

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/041767876a6d41c82260b293a06c2b6b/addf2b49cf9235d9b7a1017065cec5dece232660).

### ❌ Example of incorrect code

```js
const a = 5;
const b = a;

const c = 5;

d = c;
```

### ✅ Example of correct code

```js
const b = 5;

d = 5;
```

### declaration

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/32177535829956ef4c7b51587a8853c3/52f19ab0e467ad7cc54fa8c554c3b0804de9d1ca).

### ❌ Example of incorrect code

```js
function x() {
    const a = 5;
    return a;
}
```

### ✅ Example of correct code

```js
function x() {
    return 5;
}
```

## License

MIT
