# Add newline between tests (`add-newline-between-tests`)

Add newline between tests, for [`supertape`](https://github.com/coderaiser/supertape).

## Rule Details

This rule aims to add newline between tests.

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
