# array-elements-newline

This rule aims to add newlines between array elements.
It exists because [`array-element-newline`](https://eslint.org/docs/rules/array-element-newline) requires [`array-bracket-newline`](https://eslint.org/docs/rules/array-bracket-newline) which conflicts with [`object-braces-inside-array`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/lib/objects-braces-inside-array#readme).

Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).



## ❌ Example of incorrect code

```js
const a = [1, 2, 3, 4, 5, 6, 7];
```

## ✅ Example of correct code

```js
const a = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
];

const stdio = [0, 1, 2, 'pipe'];
```
