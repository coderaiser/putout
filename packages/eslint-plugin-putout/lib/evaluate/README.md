# evaluate expression (evaluate)

Evaluate expression started with `__putout_evaluate: `.
Provided code is processed with [`@putout/plugin-declare-undefined-variables`](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare-undefined-variables). So next code:

```js
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

Examples of **incorrect** code for this rule:

```js
import {password} from '__putout_evaluate: join("hello", " ", "world")';
```

Examples of **correct** code for this rule:

```js
import {password} from 'hello world';
```

