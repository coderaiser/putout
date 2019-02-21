# keep each property on separate lines when using multiple destructuring properties (multiple-properties-destructuring)

In the same way as eslint [object-property-newline](https://eslint.org/docs/rules/object-property-newline), but for destructuring.

## Rule Details

This rule aims to shorten destricturing of one property.

Examples of **incorrect** code for this rule:

```js
const {username, password} = user;
```

Examples of **correct** code for this rule:

```js
const {
    username,
    password
} = user;
```

