# @putout/plugin-simplify-boolean-return [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-simplify-boolean-return.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-simplify-boolean-return "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to simplify boolean return.

## Install

```
npm i @putout/plugin-simplify-boolean-return -D
```

## Rule

```json
{
    "rules": {
        "simplify-boolean-return": "on"
    }
}
```

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/304035b9529830cf20e76e9a1f35f14c/39c743921c6bfad3984a3989f25c2986ab51e8c8).

### ❌ Example of incorrect code

```js
function isA(a, b) {
    return a.length === b.length;
}
```

### ✅ Example of correct code

```js
function isA(a, b) {
    return a.length !== b.length;
}
```

## License

MIT
