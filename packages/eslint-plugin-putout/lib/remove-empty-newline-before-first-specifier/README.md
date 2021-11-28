# Remove empty new line before first specifier (`remove-empty-newline-before-first-specifier`)

## Rule Details

This rule aims to remove empty newline before first specifier.

Examples of **incorrect** code for this rule:

```js
import {
    
    a,
    b,
} from 'y';

push({
    
    a,
    b,
});
```

Examples of **correct** code for this rule:

```js
import {
    a,
    b,
} from 'y';

push({
    a,
    b,
});
```
