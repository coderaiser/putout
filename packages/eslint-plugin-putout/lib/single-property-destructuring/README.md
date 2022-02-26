# single-property-destructuring

When 🐊[**Putout**](https://github.com/coderaiser/putout) removes unused variables declared as destructured properties, it keeps one property to take 3 lines, instead of 1.
This rule aims to shorten destructuring of one property, keeping curly braces in one line.

Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
import {
    password,
} from './user.js';

const {
    username,
} = user;

```

## ✅ Example of correct code

```js
import {password} from './user.js';
import {
    helloWorld as simpleHello,
} from './hello.js';

const {username} = user;
```
