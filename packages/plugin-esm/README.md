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

- ✅ [add-index-to-import](#add-index-to-import);
- ✅ [apply-export-from](#apply-export-from);
- ✅ [convert-assert-to-with](#convert-assert-to-with);
- ✅ [declare-imports-first](#declare-imports-first);
- ✅ [group-imports-by-source](#group-imports-by-source);
- ✅ [merge-duplicate-imports](#merge-duplicate-imports);
- ✅ [merge-declaration-with-export](#merge-declaration-with-export);
- ✅ [merge-export-declarations](#merge-export-declarations);
- ✅ [remove-quotes-from-import-assertions](#remove-quotes-from-import-assertions);
- ✅ [remove-empty-import](#remove-empty-import);
- ✅ [remove-empty-export](#remove-empty-export);
- ✅ [remove-useless-export-specifiers](#remove-useless-export-specifiers);
- ✅ [sort-imports-by-specifiers](#sort-imports-by-specifiers);

## File rules

- ✅ [apply-namespace-import-file](#resolve-imported-file);
- ✅ [apply-privately-imported-file](#apply-privately-imported-file);
- ✅ [apply-js-imported-file](#apply-js-imported-file);
- ✅ [resolve-imported-file](#resolve-imported-file);
- ✅ [shorten-imported-file](#shorten-imported-file);

## Config

```json
{
    "rules": {
        "esm/add-index-to-import": "on",
        "esm/apply-export-from": "on",
        "esm/declare-imports-first": "on",
        "esm/group-imports-by-source": "on",
        "esm/merge-duplicate-imports": "on",
        "esm/merge-declaration-with-export": "on",
        "esm/merge-export-declaration": "on",
        "esm/remove-quotes-from-import-assertions": "on",
        "esm/remove-empty-export": "on",
        "esm/remove-empty-import": ["on", {
            "ignore": []
        }],
        "esm/sort-imports-by-specifiers": "on",
        "esm/apply-js-imported-file": "off",
        "esm/resolve-imported-file": "off",
        "esm/shorten-imported-file": "off",
        "esm/apply-namespace-of-file": "off",
        "esm/apply-privately-imported-file": "off",
        "esm/remove-useless-export-specifiers": "off"
    }
}
```

## Rules

### add-index-to-import

ESM doesn't add `index.js`, so it can be left after [`@putout/plugin-convert-esm-to-commonjs`](https://github.com/coderaiser/putout/blob/master/packages/plugin-convert-esm-to-commonjs#readme).
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b7c489710767efee95ecf3dd16e232a2/9f974f0a345ef4d0cb39b011097dff82e6c32b75).

#### ❌ Example of incorrect code

```js
import insertRust from './insert-rust';
import addAction from './add-action';

export const rules = {};
```

#### ✅ Example of correct code

```js
import insertRust from './insert-rust/index.js';
import addAction from './add-action/index.js';

export const rules = {};
```

### apply-export-from

> The `export` declaration is used to export values from a JavaScript module.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

Check out 🐊**Putout Editor**:

- [#1](https://putout.cloudcmd.io/#/gist/c9a3983d269745da89c1c7560f3b7fac/3ecb9aa6b910ce3816605bae11c8dd86bdc457e5);
- [#2](https://putout.cloudcmd.io/#/gist/9b2a0a51acf477291a6bbcbe7d846ddf/fa21768506f518ca0a1073beb82a9b8b8f5e7c19);

#### ❌ Example of incorrect code

```js
import * as ns_1 from 'x';
import {createAsyncLoader} from './load/async-loader.js';

export {
    ns_1 as ns,
    createAsyncLoader,
};
```

#### ✅ Example of correct code

```js
export * as ns from 'x';
export {createAsyncLoader} from './load/async-loader.js';
```

### merge-declaration-with-export

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/3fad517d76942d0a1f51d7f58a2799af/7a052ab18a31fa382228d6513c412be37091cfb8).

#### ❌ Example of incorrect code

```js
const stack = [];

function sum(a, b) {
    i32.add(local.get(), local.get());
}

export {
    sum,
    stack,
};
```

#### ✅ Example of correct code

```js
export const stack = [];

export function sum(a, b) {
    i32.add(local.get(), local.get());
}

export const {
    report,
    fix,
    scan,
} = createRemoveFiles(['*.swp', '*.swo']);
```

### merge-export-declarations

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d3e490352bd4a98033de89db670b4737/3ff4803578bf39f8587cb578a103e5d92dd92050).

#### ❌ Example of incorrect code

```js
export {
    loadPlugins,
};
export {
    loadPluginsAsync,
};
```

#### ❌ Example of incorrect code

```js
export {
    loadPlugins,
    loadPluginsAsync,
};
```

### remove-useless-export-specifiers

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e5c3ea469437ade0f4467323dcec9a36/7c298c7078b004ae3aba2a29e38579bf8f48a098).

#### ❌ Example of incorrect code

```diff
export const hello = () => 'world';
export const {
-    hello,
}
```

### declare-imports-first

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b1c18e5d726afe4ebb69d6b7a7dda82b/8189590815a1b8adb35bb8a846e28228e3c7fadf). For **CommonJS** use [nodejs/declare-after-require](https://github.com/coderaiser/putout/tree/master/packages/plugin-nodejs#declare-after-require).

#### ❌ Example of incorrect code

```js
const [arg] = process.argv;
import esbuild from 'esbuild';
```

#### ✅ Example of correct code

```js
import esbuild from 'esbuild';

const [arg] = process.argv;
```

### group-imports-by-source

Group order:

- ✅ builtins;
- ✅ external;
- ✅ hashed;
- ✅ internal;

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/3cc782acf95211f9d456d63a99032ee1/0674223d050bba572f5271ffdccf8616cb441af5).

#### ❌ Example of incorrect code

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

#### ✅ Example of correct code

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

### merge-duplicate-imports/join

#### ❌ Example of incorrect code

```js
import test from 'supertape';
import {stub} from 'supertape';
```

#### ✅ Example of correct code

```js
import test, {stub} from 'supertape';
```

### merge-duplicate-imports/rename

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

### remove-empty-export

```diff
-export {};
```

### remove-empty-import

```diff
-import 'abc';
```

### remove-quotes-from-import-assertions

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f9f34acddbefba0ded53225ca10fa44e/7b4dba44602b9b2d28fe3a98989474a4b0d8d73d).

#### ❌ Example of incorrect code

```js
import json from './mod.json' with {
    type: 'json',
};
```

#### ✅ Example of correct code

```js
import json from './mod.json' with {
    type: 'json',
};
```

### sort-imports-by-specifiers

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/521e2ff199243a7ce1f65db7140c272e/28c0588281286f8a6765b8aa2ecabbfcde2973a7).

#### ❌ Example of incorrect code

```js
import {
    a,
    b,
    c,
    d,
} from 'd';
import a1 from 'a1';
```

#### ✅ Example of correct code

```js
import a1 from 'a1';
import {
    a,
    b,
    c,
    d,
} from 'd';
```

### convert-assert-to-with

> This feature would ideally use the `with` keyword to denote attributes, but there are existing implementations based on a previous version of the proposal using the `assert` keyword. Due to potential web compatibility risks, the proposal still includes `assert` marked as deprecated. Usage of the old syntax is discouraged, and its removal is being investigated.
>
> (c) [tc39](https://tc39.es/proposal-import-attributes/)

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9f85897b998c6458efc19db6a5414b79/57ef7cdd113c7a0087e0f7a6e70522f60baa04f4).

#### ❌ Example of incorrect code

```
import json from './foo.json' assert {
    type: 'json',
};

import('foo.json', {
    assert: {
        type: 'json',
    },
});
```

#### ✅ Example of correct code

```js
import json from './foo.json' with {
    type: 'json',
};

import('foo.json', {
    with: {
        type: 'json',
    },
});
```

## File Rules

### apply-namespace-import-to-file

The rule fixes:

> `SyntaxError: The requested module './a.js' does not provide an export named 'default'`

Check out in 🐊**Putout Editor**:

- ✅ [`apply-namespace-import-to-file`](https://putout.cloudcmd.io/#/gist/1492d584559e5798325047de679222a0/c6a37a803b80823de1b64ab944f2427aecefb51b);
- ✅ [`get-imports`](https://putout.cloudcmd.io/#/gist/5d7687215e9fbdf705935c444503dded/75a98d2db9d3847c73017e41637924b1cfd5a598);
- ✅ [`has-export-default`](https://putout.cloudcmd.io/#/gist/b50ccfe5cc8c0c97e2fc98b37903ade4/fbc026e6f1027581f7aa4879dcafcaa7754bf8f4);
- ✅ [`apply-namespace-import`](https://putout.cloudcmd.io/#/gist/23a6dc6741b772c03fbed95feda2b451/1fbecac6fc40282bcda0593aa666a8c213ef85b7);
- ✅ [`is-esm`](https://putout.cloudcmd.io/#/gist/fa080be2bf3a6560e289d84b5873c2bc/2601091f6bf97148843767968c3afcb36dde31de);

Let's consider file structure:

```
/
|-- lib/
|  `-- index.js "import a from './a.js';"
|  `-- a.js "export const x = 2;"
```

In this case `index.js` can be fixed:

#### ❌ Example of incorrect code

```js
import a from './a.js';
```

#### ✅ Example of correct code

```js
import * as a from './a.js';
```

### apply-privately-imported-to-file

> Entries in the imports field must be strings starting with `#`.
> Package imports permit mapping to external packages.
> This field defines subpath imports for the current package.
>
> (c) [nodejs.org](https://nodejs.org/api/packages.html#imports)

Check out in 🐊**Putout Editor**:

- ✅ [`get-imports`](https://putout.cloudcmd.io/#/gist/5d7687215e9fbdf705935c444503dded/75a98d2db9d3847c73017e41637924b1cfd5a598);
- ✅ [`change-imports`](https://putout.cloudcmd.io/#/gist/23a6dc6741b772c03fbed95feda2b451/1fbecac6fc40282bcda0593aa666a8c213ef85b7);

Let's consider file structure:

```
/
|-- package.json {"imports": {"#is: {"default": "./lib/tokenize/is.js"}}}
|-- lib/
|  `-- tokenize/
|     `-- is.js "export const isPrev = () => {}"
|     `-- expressions/
        `-- spread-element.js "import {isPrev} from '../is.js"
```

In this case `spread-element.js` can be fixed:

#### ❌ Example of incorrect code

```js
import {isPrev} from '../is.js';
```

#### ✅ Example of correct code

```js
import {isPrev} from '#is';
```

### resolve-imported-file

Check out in 🐊**Putout Editor**:

- ✅ [`resolve-imported-file`](https://putout.cloudcmd.io/#/gist/241489cb2781dd37ec96baf0115cde4e/83c2f2e9f490850b7fda432f8d25ae6a64ed07e3);
- ✅ [`get-imports`](https://putout.cloudcmd.io/#/gist/ee10100fed86e4db926885dd54298668/7538bca7a9ae006d976f41261c0ed4c0e1902ace);
- ✅ [`change-imports`](https://putout.cloudcmd.io/#/gist/23a6dc6741b772c03fbed95feda2b451/1fbecac6fc40282bcda0593aa666a8c213ef85b7);

Let's consider file structure:

```
/
|-- lib/
|  `-- index.js
|  `-- a.js
```

In this case `index.js` can be fixed:

#### ❌ Example of incorrect code

```js
import a from './a';
```

#### ✅ Example of correct code

```js
import a from './a.js';
```

### shorten-imported-file

Check out in 🐊**Putout Editor**:

- ✅ [`get-imports`](https://putout.cloudcmd.io/#/gist/ee10100fed86e4db926885dd54298668/7538bca7a9ae006d976f41261c0ed4c0e1902ace);
- ✅ [`change-imports`](https://putout.cloudcmd.io/#/gist/23a6dc6741b772c03fbed95feda2b451/1fbecac6fc40282bcda0593aa666a8c213ef85b7);

Let's consider file structure:

```
/
|-- processors/
|  `-- index.js
|  `-- parse-processor-names.js
```

In this case `index.js` can be fixed:

#### ❌ Example of incorrect code

```js
import {parseProcessorNames} from '../processors/parse-processor-names.js';
```

#### ✅ Example of correct code

```js
import {parseProcessorNames} from './parse-processor-names.js';
```

### apply-js-imported-file

Check out in 🐊**Putout Editor**:

- ✅ [`get-imports`](https://putout.cloudcmd.io/#/gist/ee10100fed86e4db926885dd54298668/7538bca7a9ae006d976f41261c0ed4c0e1902ace);
- ✅ [`change-imports`](https://putout.cloudcmd.io/#/gist/23a6dc6741b772c03fbed95feda2b451/1fbecac6fc40282bcda0593aa666a8c213ef85b7);

Let's consider file structure:

```
/
|-- lib/
|  `-- index.js
|  `-- a.js
```

In this case `index.js` can be fixed:

#### ❌ Example of incorrect code

```js
import a from './a.mjs';
```

#### ✅ Example of correct code

```js
import a from './a.js';
```

## License

MIT
