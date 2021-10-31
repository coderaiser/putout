# @putout/plugin-apply-try-catch [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-try-catch.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-try-catch"npm"

`putout` plugin adds ability to apply [tryCatch](https://github.com/coderaiser/try-catch).

## Install

```
npm i @putout/plugin-apply-try-catch
```

## Rule

```json
{
    "rules": {
        "apply-try-catch/try-catch": "on",
        "apply-try-catch/try-to-catch": "on"
    }
}
```

## tryCatch

### ❌ Incorrect code example

```js
try {
    log('hello');
} catch(error) {
}
```

### ✅ Correct code Example

```js
const [error] = tryCatch(log, 'hello');
```

## tryToCatch

### ❌ Incorrect code example

```js
try {
    await send('hello');
} catch(error) {
}
```

### ✅ Correct code Example

```js
const [error] = await tryCatch(log, 'hello');
```

## License

MIT
