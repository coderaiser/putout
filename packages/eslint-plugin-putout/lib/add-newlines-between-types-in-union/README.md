# add-newlines-between-types-in-union

This rule aims to add newlines between types in union.

## ❌ Example of incorrect code

```js
const a = string | number | object | boolean;
```

## ✅ Example of correct code

```js
const a = string
    | number
    | object
    | boolean;
```
