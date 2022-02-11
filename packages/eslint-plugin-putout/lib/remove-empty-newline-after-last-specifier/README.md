# remove-empty-newline-after-last-specifier

Remove empty newline after last specifier.
Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

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

## ✅ Example of correct code

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
