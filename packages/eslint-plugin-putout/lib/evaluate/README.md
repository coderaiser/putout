# Evaluate

Evaluate expression started with `__putout_evaluate: `. Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).
Provided code is processed with [`@putout/plugin-declare`](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare):

```js
__putout_evaluate: join('hello', ' ', 'world');
```

and converted to:

```js
const fn = (__filename, __dirname, require) => {
    const {join} = require('path');
    return join('hello', ' ', 'world');
};
```

When you want to evaluate expressions `source` of `ImportDeclaration`:

## ❌ Example of incorrect code

```js
import {readFile} from '__putout_evaluate: `./` + basename(__filename).replace(`.spec.js`, `.js`)';

```

## ✅ Example of correct code

```js
import {readFile} from './hello.js';
```
