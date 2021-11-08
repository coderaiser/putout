# Remove empty new line after last specifier(remove-empty-newline-after-last-specifier)

## Rule Details

This rule aims to remove empty newline after last specifier.

Examples of **incorrect** code for this rule:

```js
import {
    a,
    b,

} from 'y';
```

Examples of **correct** code for this rule:

```js
import {
    a,
    b,
} from 'y';
```
