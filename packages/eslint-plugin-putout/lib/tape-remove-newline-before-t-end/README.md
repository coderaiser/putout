# remove-newline-before-t-end

Remove newline before `t.end()`, for [`supertape`](https://github.com/coderaiser/supertape).

## ❌ Incorrect code example

```js
test('lint: do some check', (t) => {
    const result = 1 + 2;
    
    t.equal(result, 3);
    
    t.end();
});
```

## ✅ Correct code example

```js
test('lint: do some check', (t) => {
    const result = 1 + 2;
    
    t.equal(result, 3);
    t.end();
});
```
