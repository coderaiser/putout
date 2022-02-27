# multiple-properties-destructuring

Keep each property on separate line when using multiple destructuring properties
In the same way as eslint [object-property-newline](https://eslint.org/docs/rules/object-property-newline), but for destructuring.

Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
const {a, b, c} = user;
```

```js
import {a, b, c} from 'user';
```

## ✅ Example of correct code

```js
const {
    a,
    b,
    c,
} = user;
```

```js
import {
    a,
    b,
    c,
} from 'user';
```

## Options

`minProperties` - minimum properties count to work with, defaults: `2`.

```js
const {
    username,
    password,
} = user;
```
