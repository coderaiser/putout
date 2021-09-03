# keep each element on separate line (array-element-newline)

In the same way as `ESLint`[oarray-element-newline](https://eslint.org/docs/rules/object-property-newline), but only for `string`, `identifier`, `number`.

## Rule Details

Examples of **incorrect** code for this rule:

```js
const array = [1, 2, 3, 4];
```

Examples of **correct** code for this rule:

```js
const array = [
    1,
    2,
    3,
    4,
];
```

