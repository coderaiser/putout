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
        "remove-useless-spread/object": "on",
        "remove-useless-spread/nested": "on"
    }
}
```

## array

The thing is `[...b]` can be used for:

- copying an array;
- converting different value type like `string` to an `array`.

So better to be more concrete and use `slice` for copying and `Array()`/`Array.from()` for converting to decrease cognitive load.
Also sometimes there is no need on any of this operations, and we can drop `spread`.

### ❌ Example of incorrect code

```js
for (const a of [...b]) {}

const places = [...getPlaces()];
```

### ✅ Example of correct code

```js
for (const a of b) {}

const places = getPlaces();

// Array constructor creates sparse array
[...Array(5)].map(Number);
```

## object

### ❌ Example of incorrect code

```js
const a = {
    ...fn(),
};
```

### ✅ Example of correct code

```js
const a = fn();
```

## nested

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/60e5a99112affb8a629347e5bf04aedf/38b33f3b5b133897b346a018462c431824e64bb8).

### ❌ Example of incorrect code

```js
[
    ...[
        ...a,
        ...b,
    ],
    ...x,
];
```

### ✅ Example of correct code

```js
[
    ...a,
    ...b,
    ...x,
];
```

## License

MIT
