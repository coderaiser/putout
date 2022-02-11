# add-newline-between-tests

Add newline between tests, for [`supertape`](https://github.com/coderaiser/supertape).

## ❌ Example of incorrect code

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

## ✅ Example of correct code

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
