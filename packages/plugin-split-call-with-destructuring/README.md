# @putout/plugin-split-call-with-destructuring [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-split-call-with-destructuring.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-split-call-with-destructuring "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to split `call` with `destructuring`.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/4da111f11ed1448d7e1707a61439faff/b9a8a2041c6171cd7af5621dce7f902cc8c2ae18).

## Install

```
npm i @putout/plugin-split-call-with-destructuring
```

## Rule

```json
{
    "rules": {
        "split-call-with-destructuring": "on"
    }
}
```

## ❌ Example of incorrect code

```js
console.log('hello')({uid} = path.scope);
console.log('hello')[uid] = path.scope;
```

## ✅ Example of correct code

```js
console.log('hello');
({uid} = path.scope);

console.log('hello');
[uid] = path.scope;
```

## License

MIT
