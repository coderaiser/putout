# remove-empty-newline-between-declarations

This rule aims to remove empty newline between Variable Declarations. Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
const {a} = b;
const {c} = a;
```

## ✅ Example of correct code

```js
const {a} = b;
const {c} = a;
```
