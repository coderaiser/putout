# Add new line before function call (add-newline-before-function-call)

## Rule Details

This rule aims to add newline before function call.

Examples of **incorrect** code for this rule:

```js
export function parse() {
    const a = 1;
    const b = 2;
    fn();
}
```

Examples of **correct** code for this rule:

```js
export function parse() {
    const a = 1;
    const b = 2;
    
    fn();
}
```
