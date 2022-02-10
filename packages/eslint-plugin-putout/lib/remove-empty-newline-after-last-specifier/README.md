# remove-empty-newline-after-last-specifier

Remove empty newline after last specifier.

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
