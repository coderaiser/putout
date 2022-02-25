# add-newline-before-function-call

This rule aims to add newline before `function call` and `assignment`. Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
export function parse() {
    const a = 1;
    const b = 2;
    fn();
}

export function calc() {
    const b = 2;
}
```

## ✅ Example of correct code

```js
export function parse() {
    const a = 1;
    const b = 2;
    
    fn();
}

export function calc() {
    const b = 2;
}
```
