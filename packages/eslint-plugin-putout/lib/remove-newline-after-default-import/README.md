# remove-newline-after-default-import

This rule aims to remove newline after default import, before opening curly brace (`{`).
Fixes [`object-curly-newline`](https://eslint.org/docs/rules/object-curly-newline) + [`eslint-plugin-modules-newline`](https://github.com/gmsorrow/eslint-plugin-modules-newline).
Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Incorrect code example

```js
import x,
{
    a,
    b,
} from 'y';
```

## ✅ Correct code example

```js
import x, {
    a,
    b,
} from 'y';
```
