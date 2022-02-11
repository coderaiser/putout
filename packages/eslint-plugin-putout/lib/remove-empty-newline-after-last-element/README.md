# remove-empty-newline-after-last-element

Remove empty newline after last element.
Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
push([
    a,
    b,

]);
```

## ✅ Example of correct code

```js
push([
    a,
    b,
]);
```
