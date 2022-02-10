# remove-empty-newline-after-last-element

Remove empty newline after last element.
Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Incorrect code example

```js
push([
    a,
    b,

]);
```

## ✅ Correct code example

```js
push([
    a,
    b,
]);
```
