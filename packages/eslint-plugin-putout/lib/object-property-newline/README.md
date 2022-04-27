# object-property-newline

Keep each property on separate line when initializing an object. In the same way as **ESLint** [`object-property-newline`](https://eslint.org/docs/rules/object-property-newline) but for initializing variables with [**Object Expression**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) or using `type` and `interface` keywords in **TypeScript**.

Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```ts
const user = {name};

module.exports = {lint: 'putout lint'};

type User = {name: string};
interface Place {message: string}
```

## ✅ Example of correct code

```ts
const user = {
    name,
};

module.exports = {
    lint: 'putout lint',
};

type User = {
    name: string,
};

interface Place {
    message: string;
}
```
