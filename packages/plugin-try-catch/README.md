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

## Rules

- ✅ [await](#await);
- ✅ [args](#args);
- ✅ [apply-destructuring](#apply-destructuring);
- ✅ [declare](#declare);
- ✅ [expand-arguments](#expand-args);
- ✅ [sync](#sync);
- ✅ [async](#async);

## Rule

```json
{
    "rules": {
        "try-catch/await": "on",
        "try-catch/args": "on",
        "try-catch/apply-destructuring": "on",
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
import {tryCatch} from 'try-catch';

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
import {tryToCatch} from 'try-catch';

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

## apply-destructuring

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/3356a8971b6ef8dcc7f35d09f0670576/6690425625bfa8df47db2e9afdd3e7490e15c6c0).

### ❌ Example of incorrect code

```js
import {tryCatch} from 'try-catch';
import {tryToCatch} from 'try-to-catch';
```

### ✅ Example of correct code

```js
import {tryCatch} from 'try-catch';
import {tryToCatch} from 'try-to-catch';
```

## declare

### ❌ Example of incorrect code

```js
const [error] = tryCatch(fs.readFileSync, 'hello.txt');
```

### ✅ Example of correct code

```js
import {tryCatch} from 'try-catch';

const [error] = tryCatch(fs.readFileSync, 'hello.txt');
```

## expand-args

### ❌ Example of incorrect code

```js
import {tryCatch} from 'try-catch';

test('some message', (t) => {
    const fn = () => copymitter('/hello');
    const [error] = tryCatch(fn);
    
    t.equal(error.message, 'to should be a string!');
    t.end();
});
```

### ✅ Example of correct code

```js
import {tryCatch} from 'try-catch';

test('some message', (t) => {
    const [error] = tryCatch(copymitter, '/hello');
    
    t.equal(error.message, 'to should be a string!');
    t.end();
});
```

## License

MIT
