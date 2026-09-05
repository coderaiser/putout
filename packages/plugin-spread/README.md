# @putout/plugin-spread [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-spread.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-spread "npm"

> **Spread** syntax can be used when all elements from an object or array need to be included in a list of some kind.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform **spread** syntax.

## Install

```
npm i @putout/plugin-spread
```

## Rules

- ✅ [convert-apply-to-spread](#convert-apply-to-spread);
- ✅ [convert-convert-object-assign-to-merge-spread](#convert-object-assign-to-merge-spread);
- ✅ [remove-useless-array](#remove-useless-array);
- ✅ [remove-useless-object](#remove-useless-object);
- ✅ [simplify-nested](#simplify-nested);

## Rule

```json
{
    "rules": {
        "spread/convert-apply-to-spread": "on",
        "spread/convert-object-assign-to-merge-spread": "on",
        "spread/remove-useless-array": "on",
        "spread/remove-useless-object": "on",
        "spread/simplify-nested": "on",
        "spread/remove-useless-logical": "on"
    }
}
```

## convert-object-assign-to-merge-spread

> The [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method copies all enumerable own properties from one or more source objects to a target object and returns the modified target object.
>
> [**Spread**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) syntax (`...`) allows an object expression to be expanded in places where zero or more key-value pairs are expected.
>
> (c) MDN

Convert `Object.assign()` to merge **spread** since it shorter but does (mostly) the same.

### ❌ Example of incorrect code

```js
function merge(a) {
    return Object.assign({}, a, {
        hello: 'world',
    });
}
```

### ✅ Example of correct code

```js
function merge(a) {
    return {
        ...a,
        hello: 'world',
    };
}
```

### Comparison

| Linter        | Rule | Fix |
|---------------|------|-----|
| 🐊 **Putout** | [`spread/convert-object-assign-to-merge-spread`](https://github.com/coderaiser/putout/tree/master/packages/plugin-spread#convert-object-assign-to-merge-spread) | ✅   |
| ⏣ **ESLint**  | [`prefer-object-spread`](https://eslint.org/docs/rules/prefer-object-spread) | ✅   |

## remove-useless-array

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

## remove-useless-object

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

## convert-apply-to-spread

> Spread syntax (`...`) allows an array expression to be expanded in places where zero or more arguments are expected.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### ❌ Example of incorrect code

```js
console.apply(null, arguments);
```

### ✅ Example of correct code

```js
console.log(...arguments);
```

## remove-useless-logical

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/6ceb0366f6576b18d4c08afe266ee637/da9616c2ad6f21472704d44e65609e81de22721c).

### ❌ Example of incorrect code

```js
const state = {
    workbench: {
        ...base.workbench,
        ...overrides.workbench || {},
    },
};
```

### ✅ Example of correct code

```js
const state = {
    workbench: {
        ...base.workbench,
        ...overrides.workbench,
    },
};
```

## License

MIT
