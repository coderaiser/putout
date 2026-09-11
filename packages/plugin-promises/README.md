# @putout/plugin-promises [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-promises.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-promises "npm"

> A `Promise` is in one of these states:
>
> - ✅ `pending`: initial state, neither fulfilled nor rejected;
> - ✅ `fulfilled`: meaning that the operation was completed successfully;
> - ✅ `rejected`: meaning that the operation failed;
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin improves `Promise`-related code.

## Install

```
npm i @putout/plugin-promises -D
```

## Rules

- ✅ [add-missing-async](#add-missing-async);
- ✅ [add-missing-await](#add-missing-await);
- ✅ [apply-await-import](#apply-await-import);
- ✅ [apply-top-level-await](#apply-top-level-await);
- ✅ [apply-with-resolvers](#apply-with-resolvers);
- ✅ [convert-new-promise-to-async](#convert-new-promise-to-async);
- ✅ [convert-reject-to-throw](#convert-reject-to-throw);
- ✅ [convert-resolve-to-async](#convert-resolve-to-async);
- ✅ [remove-useless-async](#remove-useless-async);
- ✅ [remove-useless-await](#remove-useless-await);
- ✅ [remove-useless-resolve](#remove-useless-resolve);
- ✅ [remove-useless-variables](#remove-useless-variables);

## Config

```json
{
    "rules": {
        "promises/add-missing-await": "on",
        "promises/add-missing-async": "on",
        "promises/apply-await-import": "on",
        "promises/apply-top-level-await": "on",
        "promises/apply-with-resolvers": "off",
        "promises/remove-useless-resolve": "on",
        "promises/remove-useless-async": "on",
        "promises/remove-useless-await": "on",
        "promises/remove-useless-variables": "on",
        "promises/convert-reject-to-throw": "on",
        "promises/convert-resolve-to-async": "on",
        "promises/convert-new-promise-to-async": "on"
    }
}
```

☝️ If you want to override any of it, update `.putout.json` in the directory near your files.

[🦉 Configuration](https://github.com/coderaiser/putout#-configuration) section of 🐊**Putout** documentation tell you more about all configuration options supported.

## add-missing-async

> The `async` function declaration creates a binding of a new async function to a given name. The `await` keyword is permitted within the function body, enabling asynchronous, promise-based behavior to be written in a cleaner style and avoiding the need to explicitly configure promise chains.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

### ❌ Example of incorrect code

```js
function hello() {
    await world();
}
```

### ✅ Example of correct code

```js
async function hello() {
    await world();
}
```

## add-missing-await

> Using `return await` inside an `async function` keeps the current `function` in the `call stack` until the `Promise` that is being awaited has resolved, at the cost of an extra microtask before resolving the outer `Promise`. `return await` can also be used in a `try/catch statement` to catch errors from another function that returns a Promise.

> You can avoid the extra microtask by not awaiting the return value, with the trade off of the function no longer being a part of the stack trace if an error is thrown asynchronously from the `Promise` being returned. This can make debugging more difficult.
>
> (c) [ESLint](eslint.org/docs/latest/rules/no-return-await)

### ❌ Example of incorrect code

```js
runCli();

async function runCli() {}
```

### ✅ Example of correct code

```js
await runCli();

async function runCli() {}
```

## apply-await-import

add forgotten **await** to [**dynamic `import()`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports).

### ❌ Example of incorrect code

```js
const {readFile} = import('node:fs/promises');
```

### ✅ Example of correct code

```js
const {readFile} = await import('node:fs/promises');
```

## apply-top-level-await

Applies [top-level-await](https://v8.dev/features/top-level-await).

### ❌ Example of incorrect code

```js
import {readFile} from 'node:fs/promises';

(async () => {
    await readFile('./README.md', 'utf8');
})();
```

### ✅ Example of correct code

```js
import {readFile} from 'node:fs/promises';

await readFile('./README.md', 'utf8');
```

## apply-with-resolvers

> The `Promise.withResolvers()` static method returns an object containing a new `Promise` object and two functions to `resolve` or `reject` it, corresponding to the two parameters passed to the executor of the `Promise()` constructor.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers)

Checkout in

- 🐊📱[**Mobile Putout Editor**](https://putout.vercel.app/#/gist/e93dc4b71d05661e5d96141f31880945/de8940e2b8ecaebfcfe782cf25b221cb48830a03);
- 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e93dc4b71d05661e5d96141f31880945/de8940e2b8ecaebfcfe782cf25b221cb48830a03);

### ❌ Example of incorrect code

```js
const promise = new Promise((res, rej) => {});
```

### ✅ Example of correct code

```js
const {
    promise,
    resolve,
    reject,
} = Promise.withResolvers();
```

## convert-new-promise-to-async

### ❌ Example of incorrect code

```js
function get() {
    return new Promise((resolve, reject) => {
        reject(Error('Cannot get'));
    });
}
```

### ✅ Example of correct code

```js
async function get() {
    throw Error('Cannot get');
}
```

## convert-reject-to-throw

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/713b90dbccb014eca7c23c9b2756c31d/3ce19b35a409a455fe1b3cf7bbf8cbed1b594512).

### ❌ Example of incorrect code

```js
async function hello() {
    return Promise.reject(Error('error'));
}
```

### ✅ Example of correct code

```js
async function hello() {
    throw Error('error');
}
```

## convert-resolve-to-async

> The **async function** declaration creates a binding of a new async function to a given name.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/67e173a6814de807d3ac7fd0276242a0/402665096e866a7b39bd25feb4af5f8621917105).

### ❌ Example of incorrect code

```js
x.stub(() => Promise.resolve({
    hello: 'world',
}));
```

### ✅ Example of correct code

```js
x.stub(async () => ({
    hello: 'world',
}));
```

## remove-useless-async

### ❌ Example of incorrect code

```js
async function hello() {
    return 'hello';
}
```

### ✅ Example of correct code

```js
function hello() {
    return 'hello';
}
```

## remove-useless-await

> If a handler function returns another pending promise object, the resolution of the **promise** returned by `then` will be subsequent to the resolution of the promise returned by the handler. Also, the resolved value of the **promise** returned by `then` will be the same as the resolved value of the **promise** returned by the handler.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#return_value)

### ❌ Example of incorrect code

```js
await await Promise.resolve();
const hello = await 'world';
```

### ✅ Example of correct code

```js
await Promise.resolve();
const hello = 'world';
```

## remove-useless-resolve

### ❌ Example of incorrect code

```js
async function hello() {
    return Promise.resolve('hello');
}
```

### ✅ Example of correct code

```js
async function hello() {
    return 'hello';
}
```

## remove-useless-variables

### ❌ Example of incorrect code

```js
async () => {
    const result = transformer.transform(realTransformer, transformCode, code, parser);
    
    const result2 = await Promise.resolve(result);
    
    return result2;
};
```

### ✅ Example of correct code

```js
async () => {
    const result = transformer.transform(realTransformer, transformCode, code, parser);
    
    return result;
};
```

## License

MIT
