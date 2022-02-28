# @putout/plugin-remove-duplicate-keys [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-keys.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-duplicate-keys"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove duplecate keys.

## Install

```
npm i @putout/plugin-remove-duplicate-keys
```

## Rule

```json
{
    "rules": {
        "remove-duplicate-keys": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const a = {
    x: 'hello',
    ...z,
    x: 'world',
};
```

## ✅ Example of correct code

```js
const a = {
    ...z,
    x: 'world',
};
```

## License

MIT
