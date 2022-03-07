# remove-empty-newline-after-import

This rule aims to remove empty newline after [`import` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
import {readFile} from 'fs';

import {promisify} from 'util';

import index from './index.js';
```

## ✅ Example of correct code

```js
import {readFile} from 'fs';
import {promisify} from 'util';

import index from './index.js';
```
