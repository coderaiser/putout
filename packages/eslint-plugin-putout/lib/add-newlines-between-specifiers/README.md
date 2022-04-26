# add-newlines-between-specifiers

This rule aims to add newlines between specifiers.

## ❌ Example of incorrect code

```js
let a;
let b;
let c;
let d;
let e;
let f;

export {a, b, c, d, e, f};
```

## ✅ Example of correct code

```js
let a;
let b;
let c;
let d;
let e;
let f;

export {
    a,
    b,
    c,
    d,
    e,
    f,
};
```
