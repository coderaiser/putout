# @putout/plugin-maybe [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-maybe.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-maybe "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with `maybe` monad.

## Install

```
npm i @putout/plugin-maybe -D
```

## Rules

```json
{
    "rules": {
        "maybe/array": "on",
        "maybe/call": "on",
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
const array = isArray(a) ? a : [a];
```

### ✅ Example of correct code

```js
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

## call

### ❌ Example of incorrect code

```js
const {
    print,
    newlineBefore,
} = plugin;

if (typeof newlineBefore === 'function' && newlineBefore()) {
    printer.print.newline();
}
```

### ✅ Example of correct code

```js
const {
    print,
    newlineBefore,
} = plugin;

const isFn = (fn) => typeof fn === 'function';
const call = (fn, ...args) =>  isFn(fn) && fn(...args);

if (call(newlineBefore)) {
    printer.print.newline();
}
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

### ❌ Example of incorrect code

```js
const fn = maybeFn(f);
```

### ✅ Example of correct code

```js
const isFn = (a) => typeof a === 'function';
const noop = () => {};
const maybeFn = isFn(a) ? a : noop;
const fn = maybeFn(f);
```

## License

MIT
