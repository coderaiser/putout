# @putout/plugin-maybe [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-maybe.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-maybe "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with `maybe` monad.

## Install

```
npm i @putout/plugin-maybe -D
```

## Rules

- ✅ [array](#array);
- ✅ [declare](#declare);
- ✅ [empty-array](#empty-array);
- ✅ [fn](#fn);
- ✅ [noop](#noop);

## Config

```json
{
    "rules": {
        "maybe/array": "on",
        "maybe/empty-array": "on",
        "maybe/fn": "on",
        "maybe/noop": "on",
        "maybe/declare": "on"
    }
}
```

## array

### ❌ Example of incorrect code

```js
const {isArray} = Array;
const array = isArray(a) ? a : [a];
```

### ✅ Example of correct code

```js
const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const array = maybeArray(a);
```

## empty-array

### ❌ Example of incorrect code

```js
const array = !a ? [] : a;
```

### ✅ Example of correct code

```js
const maybeArray = (a) => !a ? [] : a;
const array = maybeEmptyArray(a);
```

## fn

### ❌ Example of incorrect code

```js
const isFn = (a) => typeof a === 'function';
const fn = isFn(a) ? a : () => {};
```

### ✅ Example of correct code

```js
const isFn = (a) => typeof a === 'function';
const noop = () => {};
const maybeFn = isFn(a) ? a : noop;
const fn = maybeFn(a);
```

## noop

### ❌ Example of incorrect code

```js
const fn = f || (() => {});
```

### ✅ Example of correct code

```js
const noop = () => {};
const fn = fn || noop;
```

## declare

Declares:

- ✅ `maybeArray`;
- ✅ `maybeEmptyArray`;
- ✅ `maybeArrayFrom`;
- ✅ `maybeFn`;
- ✅ `maybeFirst`;
- ✅ `maybeCall`;

### ❌ Example of incorrect code

When you not sure is `f` a function, but you want to use it as function anyways:

```js
const fn = maybeFn(f);

maybeCall(fn);
```

### ✅ Example of correct code

```js
const isFn = (a) => typeof a === 'function';
const noop = () => {};
const maybeFn = (a) => isFn(a) ? a : noop;
const maybeCall = (a, ...b) => isFn(a) && a(...b);

const fn = maybeFn(f);
maybeCall(fn);
```

When you not sure is `a` is an array or not, but you want to get first element of it.

### ❌ Example of incorrect code

```js
const b = maybeFirst(a);
```

### ✅ Example of correct code

```js
const {isArray} = Array;
const maybeFirst = (a) => isArray(a) ? a[0] : a;

const b = maybeFirst(a);
```

## License

MIT
