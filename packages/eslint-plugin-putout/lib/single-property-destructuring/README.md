# Keep curly braces in one line when property is single (`single-property-destructuring`)

When 🐊[`Putout`](https://github.com/coderaiser/putout) removes unused variables declared as destructured properties, it keeps one property to take 3 lines, instead of 1.

## Rule Details

This rule aims to shorten destructuring of one property.

Examples of **incorrect** code for this rule:

```js
const {
    username,
} = user;

import {
    password,
} from './user.js';
```

Examples of **correct** code for this rule:

```js
const {username} = user;
import {password} from './user.js';

import {
    helloWorld as simpleHello,
} from './hello.js';
```
