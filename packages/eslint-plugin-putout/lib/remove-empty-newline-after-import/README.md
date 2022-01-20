# Remove empty newline after import (`remove-empty-newline-after-import`)

## Rule Details

This rule aims to remove empty newline after `import`.

Examples of **incorrect** code for this rule:

```js
import {readFile} from 'fs';

import {promisify} from 'util';

import index from './index.js';
```

Examples of **correct** code for this rule:

```js
import {readFile} from 'fs';
import {promisify} from 'util';

import index from './index.js';
```
