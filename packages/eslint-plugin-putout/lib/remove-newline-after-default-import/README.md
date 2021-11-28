# Keep opening curly brace on one line with default import (`remove-newline-after-default-import`)

Fixes [`object-curly-newline`](https://eslint.org/docs/rules/object-curly-newline) + [`eslint-plugin-modules-newline`](https://github.com/gmsorrow/eslint-plugin-modules-newline).

## Rule Details

This rule aims to shorten destructuring of properties.

Examples of **incorrect** code for this rule:

```js
import x,
{
    a,
    b,
} from 'y';
```

Examples of **correct** code for this rule:

```js
import x, {
    a,
    b,
} from 'y';
```
