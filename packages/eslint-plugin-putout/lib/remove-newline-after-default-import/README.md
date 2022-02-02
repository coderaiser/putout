# remove-newline-after-default-import

Fixes [`object-curly-newline`](https://eslint.org/docs/rules/object-curly-newline) + [`eslint-plugin-modules-newline`](https://github.com/gmsorrow/eslint-plugin-modules-newline).

This rule aims to remove newline after default import, before opening curly brace (`{`).

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
