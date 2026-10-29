# @putout/plugin-remove-useless-object-from-entries [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-object-from-entries.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-object-from-entries "npm"

> The `Object.fromEntries()` static method transforms a list of key-value pairs into an object.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries).

## Install

```
npm i @putout/plugin-remove-useless-object-from-entries
```

## Rule

```json
{
    "rules": {
        "remove-useless-object-from-entries": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const a = {
    b: Object.fromEntries(Object.entries({
        hello: 'world',
    })),
};
```

## ✅ Example of correct code

```js
const a = {
    b: {
        hello: 'world',
    },
};
```

## License

MIT
