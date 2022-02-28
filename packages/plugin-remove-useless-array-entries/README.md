# @putout/plugin-remove-useless-array-entries [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-entries.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-array-entries "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless [`array.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries).

## Install

```
npm i @putout/plugin-remove-useless-array-entries
```

## Rule

```json
{
    "rules": {
        "remove-useless-array-entries": "on"
    }
}
```

## ❌ Example of incorrect code

```js
for (const [, element] of array.entries()) {
    console.log(element);
}
```

## ✅ Example of correct code

```js
for (const element of array) {
    console.log(element);
}
```

## License

MIT
