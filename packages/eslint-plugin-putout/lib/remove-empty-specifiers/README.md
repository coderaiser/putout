# remove-empty-specifiers

This rule aims to remove empty specifiers.
Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
import putout, {} from 'putout';
```

## ✅ Example of correct code

```js
import putout from 'putout';
```
