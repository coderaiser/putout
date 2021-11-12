# @putout/plugin-remove-useless-spread [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-spread"npm"

`putout` plugin adds ability to apply shorthand properties.

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

### ❌ Incorrect code example

```js
for (const a of [...b]) {}

const a = {
    ...b,
};
```

### ✅ Correct code Example

```js
for (const a of b) {}

const a = b;
```

## Function call

### ❌ Incorrect code example

```js
const places = [...getPlaces()];
```

### ✅ Correct code Example

```js
const places = getPlaces();
```

## License

MIT
