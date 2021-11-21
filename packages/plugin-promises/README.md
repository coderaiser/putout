# @putout/plugin-promises [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-promises.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-promises"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to work with promises.

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

## Add-return-await

### ❌ Incorrect

```js
async function hello() {
    return world();
}

async function world() {
}
```

### ✅ Correct

```js
async function hello() {
    return await world();
}

async function world() {
}
```

## remove-useless-resolve

### ❌ Incorrect

```js
async function hello() {
    return Promise.resolve('hello');
}
```

### ✅ Correct

```js
async function hello() {
    return 'hello';
}
```

## remove-useless-async

### ❌ Incorrect

```js
async function hello() {
    return 'hello';
}
```

### ✅ Correct

```js
function hello() {
    return 'hello';
}
```

## remove-useless-await

### ❌ Incorrect

```js
await await Promise.resolve();
```

### ✅ Correct

```js
await await Promise.resolve();
```

## convert-reject-to-throw

### ❌ Incorrect

```js
async function hello() {
    return Promise.reject(Error('error'));
}
```

### ✅ Correct

```js
async function hello() {
    throw Error('error');
}
```

## add-missing-await

### ❌ Incorrect

```js
runCli();

async function runCli() {
}
```

### ✅ Correct

```js
await runCli();

async function runCli() {
}
```

## convert-new-promise-to-async

### ❌ Incorrect

```js
function get() {
    return new Promise((resolve, reject) => {
        reject(Error("Cannot get"));
    });
}
```

### ✅ Correct

```js
async function get() {
    throw Error("Cannot get");
}
```

## apply-top-level-await

### ❌ Incorrect

```js
import {readFile} from 'fs/promises';

(async () => {
    await readFile('./README.md', 'utf8');
})();
```

### ✅ Correct

```js
import {readFile} from 'fs/promises';

await readFile('./README.md', 'utf8');
```

## License

MIT
