# add-newline-before-return

This rule aims to add newline before `return`. Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
export function sum() {
    const a = 1;
    const b = 2;
    return a + b;
}
```

## ✅ Example of correct code

```js
export function parse() {
    const a = 1;
    const b = 2;
    
    return a + b;
}
```
