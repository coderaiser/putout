# @putout/plugin-apply-try-catch [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-try-catch.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-try-catch "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply [tryCatch](https://github.com/coderaiser/try-catch) and [tryToCatch](https://github.com/coderaiser/try-to-catch).

## Install

```
npm i @putout/plugin-apply-try-catch
```

## Rule

```json
{
    "rules": {
        "apply-try-catch/try-catch": "on",
        "apply-try-catch/try-to-catch": "on",
        "apply-try-catch/await": "on",
        "apply-try-catch/args": "on",
        "apply-try-catch/declare": "on"
    }
}
```

## try-catch

### ❌ Example of incorrect code

```js
try {
    log('hello');
} catch(error) {
}
```

### ✅ Example of correct code

```js
import tryCatch from 'try-catch';
const [error] = tryCatch(log, 'hello');
```

## try-to-catch

### ❌ Example of incorrect code

```js
try {
    await send('hello');
} catch(error) {
}
```

### ✅ Example of correct code

```js
import tryToCatch from 'try-catch';
const [error] = await tryToCatch(send, 'hello');
```

## await

### ❌ Example of incorrect code

```js
await tryCatch(a, b);
tryToCatch(a, b);
```

### ✅ Example of correct code

```js
await tryToCatch(a, b);
```

## args

### ❌ Example of incorrect code

```js
tryCatch(send('hello'));
```

### ✅ Example of correct code

```js
tryCatch(send, 'hello');
```

## declare

### ❌ Example of incorrect code

```js
const [error] = tryCatch(fs.readFileSync, 'hello.txt');
```

### ✅ Example of correct code

```js
import tryCatch from 'try-catch';
const [error] = tryCatch(fs.readFileSync, 'hello.txt');
```

## License

MIT
