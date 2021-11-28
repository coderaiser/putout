# Add new line after function call (`add-newline-after-function-call`)

## Rule Details

This rule aims to add newline after function call.

Examples of **incorrect** code for this rule:

```js
export function parse() {
    const a = 1;
    
    fn();
    const b = 2;
}
```

Examples of **correct** code for this rule:

```js
export function parse() {
    const a = 1;
    
    fn();
    
    const b = 2;
}
```
