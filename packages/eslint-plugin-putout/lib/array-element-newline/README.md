# Add new lines between types in union (add-newlines-between-types-in-union)

Because [`array-element-newline`](https://eslint.org/docs/rules/array-element-newline) requires [`array-bracket-newline`](https://eslint.org/docs/rules/array-bracket-newline).
And `array-bracket-newline` and conflicts with [`object-braces-inside-array`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/lib/objects-braces-inside-array).

## Rule Details

This rule aims to add newlines between array elements.

Examples of **incorrect** code for this rule:

```js
const a = [1, 2, 3, 4, 5, 6, 7];
```

Examples of **correct** code for this rule:

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
