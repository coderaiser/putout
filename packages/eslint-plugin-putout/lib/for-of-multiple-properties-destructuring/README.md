# Keep all properties in one line when using destructuring in `for-of` (`for-of-multiple-properties-destructuring`)

## Rule Details

This rule aims to shorten destructuring in `for-of` statements

Examples of **incorrect** code for this rule:

```js
for ({
    username,
    password,
} of users) {
}
```

Examples of **correct** code for this rule:

## Options

`maxProperties` - maximum properties count to work with.

```js
for ({username, password} of users) {
}
```
