# Add new lines between types in union (add-newlines-between-types-in-union)

## Rule Details

This rule aims to add newlines between types in union.

Examples of **incorrect** code for this rule:

```js
const a = string | number | object | boolean;
```

Examples of **correct** code for this rule:

```js
const a = string
    | number
    | object
    | boolean;
```
