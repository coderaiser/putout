# nonblock-statement-body-newline

Remove newline inside statement body. Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
if (a)
    
    b();
```

## ✅ Example of correct code

```js
if (a)
    b();
```
