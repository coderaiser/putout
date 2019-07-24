# Putout (putout)

[Putout](https://github.com/coderaiser/putout) used as eslint plugin.

## Rule Details

Rules run [putout rules](https://github.com/coderaiser/putout#built-in-transforms) in `eslint`.

Examples of **incorrect** code for this rule:

```js
const t = 'hi';
```

Examples of **correct** code for this rule:

```js
const t = 'hi';
log(t);
```

