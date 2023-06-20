# @putout/plugin-convert-const-to-let [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-const-to-let.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-const-to-let "npm"

> The `TypeError` object represents an error when attempting to modify a value that cannot be changed.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `const` to `let` to avoid `TypeError`.
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/61ffff64a356c47e66af4ea17a9a755d/e7f5fa455c208a7faa9319d94130996d39afcbf7).

## Install

```
npm i @putout/plugin-convert-const-to-let -D
```

## Rule

```json
{
    "rules": {
        "convert-const-to-let": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const a = 5;

a = 3;
```

## ✅ Example of correct code

```js
let a = 5;

a = 3;
```

## License

MIT
