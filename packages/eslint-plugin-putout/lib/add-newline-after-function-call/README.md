# add-newline-after-function-call

This rule aims to add newline after function call.

## ❌ Example of incorrect code

```js
export function parse() {
    const a = 1;
    
    fn();
    const b = 2;
}
```

## ✅ Example of correct code

```js
export function parse() {
    const a = 1;
    
    fn();
    
    const b = 2;
}
```
