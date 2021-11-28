# Spaces should be aligned (`aling-spaces`)

After `putout` process files it can remove spaces from empty line, this `rule` fixes it.

## Rule Details

This rule aims to shorten destricturing of one property.

Examples of **incorrect** code for this rule:

```js
function hello() {
    const result = [];
// ⬇ no spaces ⬇

// ⬆ no spaces ⬆
    return result;
}
```

Examples of **correct** code for this rule:

```js
function hello() {
    const result = [];
// ⬇ spaces ⬇
    
// ⬆ spaces ⬆
    return result;
}
```
