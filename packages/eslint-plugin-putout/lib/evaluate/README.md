# evaluate expression (`evaluate`)

Evaluate expression started with `__putout_evaluate: `.
Provided code is processed with [`@putout/plugin-declare-undefined-variables`](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare-undefined-variables). So next code:

```js
import {join} from 'path';
__putout_evaluate: join("hello", " ", "world");
```

Converted to:

```js
const fn = (__filename, __dirname, require) => {
    const {join} = require('path');
    return join("hello", " ", "world");
};
```

## Rule Details

This rule aims to evaluate expressions `source` of `ImportDeclaration`:

Examples of **incorrect** code located in `hello.spec.js` for this rule:

```js
import {readFile} from '__putout_evaluate: `./` + basename(__filename).replace(`.spec.js`, `.js`)';

```

Examples of **correct** code for this rule:

```js
import {readFile} from './hello.js';
```
