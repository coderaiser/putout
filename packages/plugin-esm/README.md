# @putout/plugin-esm [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-esm.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-esm "npm"

> The static `import` statement is used to `import` read only live bindings which are exported by another module.
> The imported bindings are called live bindings because they are updated by the module that exported the binding, but cannot be re-assigned by the importing module.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform to new **Node.js** API and apply best practices.

## Install

```
npm i putout @putout/plugin-esm -D
```

## Rules

- ✅ [apply-export-from](#apply-export-from);
- ✅ [declare-imports-first](#declare-imports-first);
- ✅ [group-imports-by-source](#group-imports-by-source);
- ✅ [merge-duplicate-imports](#merge-duplicate-imports);
- ✅ [remove-quotes-from-import-assertions](#remove-quotes-from-import-assertions);
- ✅ [remove-empty-import](#remove-empty-import);
- ✅ [remove-empty-export](#remove-empty-export);
- ✅ [sort-imports-by-specifiers](#sort-imports-by-specifiers);

## Config

```json
{
    "rules": {
        "esm/apply-export-from": "on",
        "esm/declare-imports-first": "on",
        "esm/group-imports-by-source": "on",
        "esm/merge-duplicate-imports": "on",
        "esm/remove-quotes-from-import-assertions": "on",
        "esm/remove-empty-export": "on",
        "esm/remove-empty-import": ["on", {
            "ignore": []
        }],
        "esm/sort-imports-by-specifiers": "on"
    }
}
```

## apply-export-from

> The `export` declaration is used to export values from a JavaScript module.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c9a3983d269745da89c1c7560f3b7fac/3ecb9aa6b910ce3816605bae11c8dd86bdc457e5).

## ❌ Example of incorrect code

```js
import * as ns_1 from 'x';

export {
    ns_1 as ns,
};
```

## ✅ Example of correct code

```js
export * as ns from 'x';
```

## declare-imports-first

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b1c18e5d726afe4ebb69d6b7a7dda82b/8189590815a1b8adb35bb8a846e28228e3c7fadf). For **CommonJS** use [nodejs/declare-after-require](https://github.com/coderaiser/putout/tree/master/packages/plugin-nodejs#declare-after-require).

## ❌ Example of incorrect code

```js
const [arg] = process.argv;
import esbuild from 'esbuild';
```

## ✅ Example of correct code

```js
import esbuild from 'esbuild';

const [arg] = process.argv;
```

## group-imports-by-source

Group order:

- ✅ builtins;
- ✅ external;
- ✅ hashed;
- ✅ internal;

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/3cc782acf95211f9d456d63a99032ee1/0674223d050bba572f5271ffdccf8616cb441af5).

## ❌ Example of incorrect code

```js
import fs from 'node:fs';
import {lodash} from 'lodash';
import react from 'react';
import d from '../hello.js';
import ss from '../../bb/ss.js';
import b from './ss.js';
import parse from '#parser';

const c = 5;
```

## ✅ Example of correct code

```js
import fs from 'node:fs';
import react from 'react';
import {lodash} from 'lodash';
import parse from '#parser';
import b from './ss.js';
import d from '../hello.js';
import ss from '../../bb/ss.js';

const c = 5;
```

## merge-duplicate-imports

### join

To disable use:

```json
{
    "rules": {
        "esm/merge-duplicate-imports-join": "off"
    }
}
```

#### ❌ Example of incorrect code

```js
import test from 'supertape';
import {stub} from 'supertape';
```

#### ✅ Example of correct code

```js
import test, {stub} from 'supertape';
```

### rename

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/6604936dec6b1eed8ce0d143f2962f15/17b310a6e4d85b0b8615a8b91d0e27414e8af291).

To disable use:

```json
{
    "rules": {
        "esm/merge-duplicate-imports-rename": "off"
    }
}
```

#### ❌ Example of incorrect code

```js
import putout from './putout.js';
import all from './putout.js';
import x from './putout.js';

console.log(all);
console.log(x);
```

#### ✅ Example of correct code

```js
import putout from './putout.js';

console.log(putout);
console.log(putout);
```

## remove-empty-export

```diff
-export {};
```

## remove-empty-import

```diff
-import 'abc';
```

## remove-quotes-from-import-assertions

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f9f34acddbefba0ded53225ca10fa44e/7b4dba44602b9b2d28fe3a98989474a4b0d8d73d).

### ❌ Example of incorrect code

```js
import json from './mod.json' with { type: 'json' };
```

## ✅ Example of correct code

```js
import json from './mod.json' with { type: 'json' };
```

## sort-imports-by-specifiers

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/521e2ff199243a7ce1f65db7140c272e/28c0588281286f8a6765b8aa2ecabbfcde2973a7).

### ❌ Example of incorrect code

```js
import {
    a,
    b,
    c,
    d,
} from 'd';
import a1 from 'a1';
```

### ✅ Example of correct code

```js
import a1 from 'a1';
import {
    a,
    b,
    c,
    d,
} from 'd';
```

## convert-assert-to-with

> This feature would ideally use the `with` keyword to denote attributes, but there are existing implementations based on a previous version of the proposal using the `assert` keyword. Due to potential web compatibility risks, the proposal still includes `assert` marked as deprecated. Usage of the old syntax is discouraged, and its removal is being investigated.
>
> (c) [tc39](https://tc39.es/proposal-import-attributes/)

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9f85897b998c6458efc19db6a5414b79/57ef7cdd113c7a0087e0f7a6e70522f60baa04f4).

## ❌ Example of incorrect code

```js
import json from './foo.json' assert { type: 'json' };

import('foo.json', {
    assert: {
        type: 'json',
    },
});
```

## ✅ Example of correct code

```js
import json from './foo.json' with { type: 'json' };

import('foo.json', {
    with: {
        type: 'json',
    },
});
```

## License

MIT
