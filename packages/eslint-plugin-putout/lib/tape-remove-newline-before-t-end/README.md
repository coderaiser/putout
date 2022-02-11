# remove-newline-before-t-end

Remove newline before `t.end()`, for [`supertape`](https://github.com/coderaiser/supertape).
Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
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
```
