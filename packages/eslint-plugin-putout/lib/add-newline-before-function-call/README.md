# Add new line before function call (`add-newline-before-function-call`)

## Rule Details

This rule aims to add newline before `function call` and `assignment`.

Examples of **incorrect** code for this rule:

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

Examples of **correct** code for this rule:

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
