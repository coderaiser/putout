# Remove newline before `t.end()` (remove-newline-before-t-end)

Remove newline before `t.end()`, for [supertape](https://github.com/coderaiser/supertape).

## Rule Details

This rule aims to remove newline before `t.end()`.

Examples of **incorrect** code for this rule:

```js
test('lint: do some check', (t) => {
    const result = 1 + 2;
    
    t.equal(result, 3);
    
    t.end();
});
```

Examples of **correct** code for this rule:

```js
test('lint: do some check', (t) => {
    const result = 1 + 2;
    
    t.equal(result, 3);
    t.end();
});
```
