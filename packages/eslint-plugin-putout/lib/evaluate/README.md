# evaluate

Evaluate expression started with `__putout_evaluate: `.
Provided code is processed with [`@putout/plugin-declare-undefined-variables`](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare-undefined-variables). So next code:

```js
import {join} from 'path';
__putout_evaluate: join("hello", " ", "world");
```

Is converted to:

```js
const fn = (__filename, __dirname, require) => {
    const {join} = require('path');
    return join("hello", " ", "world");
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
