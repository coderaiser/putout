# aling-spaces

When 🐊**Putout** processes files it can remove spaces from empty line, this `rule` fixes it.

## ❌ Example of incorrect code

```js
function hello() {
    const result = [];
// ⬇ no spaces ⬇

// ⬆ no spaces ⬆
    return result;
}
```

## ✅ Example of correct code

```js
function hello() {
    const result = [];
// ⬇ spaces ⬇
    
// ⬆ spaces ⬆
    return result;
}
```
