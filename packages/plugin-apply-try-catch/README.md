# @putout/plugin-apply-try-catch [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-try-catch.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-try-catch "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to apply [tryCatch](https://github.com/coderaiser/try-catch) and [tryToCatch](https://github.com/coderaiser/try-to-catch).

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
        "apply-try-catch/await": "on"
    }
}
```

## tryCatch

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

## tryToCatch

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

## License

MIT
