# Add new line before assertion (add-newline-before-assertion)

Add new line before `t.equal()` etc, for [supertape](https://github.com/coderaiser/supertape).

## Rule Details

This rule aims to add new line before assertion.

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
