# @putout/plugin-remove-useless-spread [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-spread "npm"

> **Spread** syntax can be used when all elements from an object or array need to be included in a list of some kind.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless **spread** syntax.

## Install

```
npm i @putout/plugin-remove-useless-spread
```

## Rule

```json
{
    "rules": {
        "remove-useless-spread/array": "on",
        "remove-useless-spread/object": "on"
    }
}
```

## array

### ❌ Example of incorrect code

```js
for (const a of [...b]) {}

const places = [...getPlaces()];
```

### ✅ Example of correct code

```js
for (const a of b) {}

const places = getPlaces();
```

## object

### ❌ Example of incorrect code

```js
const a = {
    ...b,
};
```

### ✅ Example of correct code

```js
const a = b;
```

## License

MIT
