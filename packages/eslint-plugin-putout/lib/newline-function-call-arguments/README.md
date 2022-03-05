# newline-function-call-arguments

Addition to eslint's [function-paren-newline](https://eslint.org/docs/rules/function-paren-newline)
This rule aims to fix eslint transform adding new line after opening brace.

Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
const onConnectError = squad(superFn(connect_error),
    logWraped(isLog, importStr),
    addUrl(colorUrl),
    getDescription);
```

## ✅ Example of correct code

```js
const onConnectError = squad(
    superFn(connect_error),
    logWraped(isLog, importStr),
    addUrl(colorUrl),
    getDescription,
);
```
