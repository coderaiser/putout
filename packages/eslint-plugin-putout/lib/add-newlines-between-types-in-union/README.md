# add-newlines-between-types-in-union

This rule aims to add newlines between types in union. Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
type a = string | number | object | boolean;
```

## ✅ Example of correct code

```js
type a = string
    | number
    | object
    | boolean;
```
