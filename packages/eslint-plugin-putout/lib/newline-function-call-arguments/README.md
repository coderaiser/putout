# Keep curly braces in one line when property is single (`newline-function-call-arguments`)

Addition to eslint's [function-paren-newline](https://eslint.org/docs/rules/function-paren-newline)

## Rule Details

This rule aims to fix eslint transform.

Examples of **incorrect** code for this rule:

```js
const onConnectError = squad(superFn(connect_error),
    logWraped(isLog, importStr),
    addUrl(colorUrl),
    getDescription);
```

Examples of **correct** code for this rule:

```js
const onConnectError = squad(
    superFn(connect_error),
    logWraped(isLog, importStr),
    addUrl(colorUrl),
    getDescription,
);
```
