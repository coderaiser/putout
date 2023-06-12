# @putout/plugin-try-catch [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-try-catch.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-try-catch "npm"

> The `try...catch` statement marks a `try` block and a `catch` block. If the code in the `try` block throws an exception then the code in the `catch` block will be executed.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds support of:

- ✅ [try-catch](https://github.com/coderaiser/try-catch)
- ✅ [try-to-catch](https://github.com/coderaiser/try-to-catch)

Which are drastically simplifies [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) blocks.

## Install

```
npm i @putout/plugin-try-catch
```

## Rule

```json
{
    "rules": {
        "try-catch/await": "on",
        "try-catch/args": "on",
        "try-catch/declare": "on",
        "try-catch/expand-arguments": "on",
        "try-catch/sync": "on",
        "try-catch/async": "on"
    }
}
```

## sync

### ❌ Example of incorrect code

```js
try {
    log('hello');
} catch(error) {}
```

### ✅ Example of correct code

```js
import tryCatch from 'try-catch';

const [error] = tryCatch(log, 'hello');
```

## async

### ❌ Example of incorrect code

```js
try {
    await send('hello');
} catch(error) {}
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

## expand-arguments

### ❌ Example of incorrect code

```js
import tryCatch from 'try-catch';

test('some message', (t) => {
    const fn = () => copymitter('/hello');
    const [error] = tryCatch(fn);
    
    t.equal(error.message, 'to should be a string!');
    t.end();
});
```

### ✅ Example of correct code

```js
import tryCatch from 'try-catch';

test('some message', (t) => {
    const [error] = tryCatch(copymitter, '/hello');
    
    t.equal(error.message, 'to should be a string!');
    t.end();
});
```

## License

MIT
