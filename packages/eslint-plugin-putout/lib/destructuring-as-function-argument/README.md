# destructuring-as-function-argument

When 🐊[**Putout**](https://github.com/coderaiser/putout) [removes unused variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables#readme) located in function argument object pattern, it formats it in a multiple lines.
This rule aims keep curly braces in one line when you use destructuring as function argument 

Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
const login = ({
    username,
    password,
}) => {
};
```

## ✅ Example of correct code

```js
const login = ({username, password}) => {
};
```
