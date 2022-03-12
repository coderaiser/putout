# @putout/plugin-promises [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-promises.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-promises"npm"

> The `Promise` object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to work with promises.

## Install

```
npm i @putout/plugin-promises -D
```

## Rule

```json
{
    "rules": {
        "promises/add-missing-await": "on",
        "promises/remove-useless-resolve": "on",
        "promises/remove-useless-async": "on",
        "promises/remove-useless-await": "on",
        "promises/convert-reject-to-throw": "on",
        "promises/convert-new-promise-to-async": "on",
        "promises/apply-top-level-await": "on"
    }
}
```

## add-return-await

### ❌ Example of incorrect code

```js
async function hello() {
    return world();
}

async function world() {
}
```

### ✅ Example of correct code

```js
async function hello() {
    return await world();
}

async function world() {
}
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

### ❌ Example of incorrect code

```js
await await Promise.resolve();
const hello = await 'world';
```

### ✅ Example of correct code

```js
await await Promise.resolve();
const hello = 'world';
```

## convert-reject-to-throw

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

## add-missing-await

### ❌ Example of incorrect code

```js
runCli();

async function runCli() {
}
```

### ✅ Example of correct code

```js
await runCli();

async function runCli() {
}
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

## apply-top-level-await

Applies [top-level-await](https://v8.dev/features/top-level-await).

### ❌ Example of incorrect code

```js
import {readFile} from 'fs/promises';

(async () => {
    await readFile('./README.md', 'utf8');
})();
```

### ✅ Example of correct code

```js
import {readFile} from 'fs/promises';

await readFile('./README.md', 'utf8');
```

## License

MIT
