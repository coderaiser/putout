# @putout/plugin-remove-useless-spread [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-spread"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply shorthand properties.

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

## Array

### ❌ Example of incorrect code

```js
for (const a of [...b]) {}

const a = {
    ...b,
};
```

### ✅ Example of correct code

```js
for (const a of b) {}

const a = b;
```

## Function call

### ❌ Example of incorrect code

```js
const places = [...getPlaces()];
```

### ✅ Example of correct code

```js
const places = getPlaces();
```

## License

MIT
