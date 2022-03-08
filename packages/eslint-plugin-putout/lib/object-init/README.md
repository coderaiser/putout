# object-init

Keep each property on separate line when initializing an object. In the same way as **ESLint** [`object-property-newline`](https://eslint.org/docs/rules/object-property-newline) but for initializing variables with [**Object Expression**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects).

Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
const user = {name};

module.exports = {lint: 'putout lint'};
```

## ✅ Example of correct code

```js
const user = {
    name,
};

module.exports = {
    lint: 'putout lint',
};
```
