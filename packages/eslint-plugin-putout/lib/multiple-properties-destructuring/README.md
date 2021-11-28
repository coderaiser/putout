# Keep each property on separate line when using multiple destructuring properties (`multiple-properties-destructuring`)

In the same way as eslint [object-property-newline](https://eslint.org/docs/rules/object-property-newline), but for destructuring.

## Rule Details

Examples of **incorrect** code for this rule:

```js
const {a, b, c} = user;
```

```js
import {a, b, c} from 'user';
```

Examples of **correct** code for this rule:

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

`minProperties` - minimum properties count to work with.

```js
const {
    username,
    password,
} = user;
```
