# @putout/plugin-remove-boolean-from-assertions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-boolean-from-assertions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-boolean-from-assertions "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to remove `boolean` from `assertions`.

## Install

```
npm i @putout/plugin-remove-boolean-from-assertions
```

## Rule

```json
{
    "rules": {
        "remove-boolean-from-assertions": "on"
    }
}
```

## ❌ Incorrect code example

```js
if (a === true)
    alert();
```

## ✅ Correct code Example

```js
if (a)
    alert();
```

## License

MIT
