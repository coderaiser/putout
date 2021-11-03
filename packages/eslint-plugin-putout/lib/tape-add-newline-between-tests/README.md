# Add new line between tests (add-newline-between-tests)

Add new line between tests, for [supertape](https://github.com/coderaiser/supertape).

## Rule Details

This rule aims to add new line between tests.

Examples of **incorrect** code for this rule:

```js
test('lint: do some check', (t) => {
    const result = 1 + 2;
    
    t.equal(result, 3);
    t.end();
});
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

test('lint: do some check', (t) => {
    const result = 1 + 2;
    
    t.equal(result, 3);
    t.end();
});
```
