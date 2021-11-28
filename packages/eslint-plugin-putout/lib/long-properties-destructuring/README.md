# Keep each property on separate line when destructuring long properties (`long-properties-destructuring`)

Always add new lines, when property name is longer then 15 characters.

## Rule Details

This rule aims to shorten destricturing of one property.

Examples of **incorrect** code for this rule:

```js
const {isIdentifier} = user;
```

Examples of **correct** code for this rule:

```js
const {
    isIdentifier,
} = user;
```
