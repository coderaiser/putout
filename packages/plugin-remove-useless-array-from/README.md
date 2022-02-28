# @putout/plugin-remove-useless-array-from [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-from.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-array-from"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `Array.from`.

## Install

```
npm i @putout/plugin-remove-useless-array-from
```

## Rule

```json
{
    "rules": {
        "remove-useless-array-from": "on"
    }
}
```

## ❌ Example of incorrect code

```js
for (const x of Array.from(y)) {}
```

## ✅ Example of correct code

```js
for (const x of y) {}
```

## License

MIT
