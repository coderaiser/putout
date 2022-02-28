# long-properties-destructuring

Keep each property on separate line when destructuring properties with name length **15** characters and more.

Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
const {isIdentifier} = user;
```

## ✅ Example of correct code

```js
const {
    isIdentifier,
} = user;
```
