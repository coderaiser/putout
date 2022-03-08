# object-braces-inside-array

Keep braces on the same line as brackets.
Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
const expected = [
    {
        hello: 'world',
    },
    {
        how: 'come',
    },
];
```

## ✅ Example of correct code

```js
const expected = [{
    hello: 'world',
}, {
    how: 'come',
}];
```
