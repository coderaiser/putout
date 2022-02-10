# remove-empty-newline-after-last-specifier

Remove empty newline after last specifier.
Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Incorrect code example

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

## ✅ Correct code example

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
