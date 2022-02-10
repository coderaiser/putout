# remove-empty-newline-after-last-specifier

## Rule Details

This rule aims to remove empty newline after last specifier.

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
