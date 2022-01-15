# Remove empty specifiers(`remove-empty-specifiers`)

## Rule Details

This rule aims to remove empty specifiers.

Examples of **incorrect** code for this rule:

```js
import putout, {} from 'putout';
```

Examples of **correct** code for this rule:

```js
import putout from 'putout';
```
