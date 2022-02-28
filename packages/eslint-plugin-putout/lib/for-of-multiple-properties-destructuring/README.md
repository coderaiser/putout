# for-of-multiple-properties-destructuring

This rule aims to shorten destructuring in `for-of` statements, keeping all properties in one line.
Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
for ({
    username,
    password,
} of users) {
}
```

## ✅ Example of correct code

```js
for ({username, password} of users) {
}
```

## Options

`maxProperties` - maximum properties count to work with, defaults to **8**.
