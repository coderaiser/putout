# @putout/plugin-mock-require [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-tape.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-mock-require "npm"

> Tape-inspired TAP-compatible simplest high speed test runner with superpowers.
>
> (c) 📼[**Supertape**](https://github.com/coderaiser/supertape)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to apply best parctises for tests written with 📼[**Supertape**](https://github.com/coderaiser/supertape).

## Install

```
npm i @putout/plugin-tape -D
```

## Rules

- ✅ [add-await-to-re-import](#add-await-to-re-import);
- ✅ [add-node-prefix-to-mock-require](#add-node-prefix-to-mock-require);
- ✅ [add-stop-all](#add-stop-all);
- ✅ [convert-mock-require-to-mock-import](#convert-mock-require-to-mock-import);
- ✅ [declare](#declare);
- ✅ [remove-stop-all](#remove-stop-all);

## Config

```json
{
    "rules": {
        "tape/convert-mock-require-to-mock-import": "off",
        "tape/add-stop-all": "on",
        "tape/add-await-to-re-import": "on",
        "tape/add-node-prefix-to-mock-require": "on",
        "tape/declare": "on",
        "tape/remove-stop-all": "on"
    }
}
```

## declare

### `mockImport`

#### ❌ Example of incorrect code

```js
import {stub} from 'supertape';

mockImport('fs/promises', {
    readFile: stub().resolves(''),
});
```

##### ✅ Example of correct code

```js
import {stub} from 'supertape';
import {createMockImport} from 'mock-import';

const {
    mockImport,
    stopAll,
    reImport,
} = createMockImport(import.meta.url);

mockImport('fs/promises', {
    readFile: stub().resolves(''),
});
```

### `test`

#### ❌ Example of incorrect code

```js
test('xxx', (t) => {
    const a = stub();
    t.end();
});
```

#### ✅ Example of correct code

```js
import {test, stub} from 'supertape';

test('xxx', (t) => {
    const a = stub();
    t.end();
});
```

## add-node-prefix-to-mock-require

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/38f43d1972b3ebe37597022b42024cd5/ccd8cf8a3ff4a30c6dccc528358f9439f1fd366e).

### ❌ Example of incorrect code

```js
mockRequire('fs/promises', {
    readdir,
});
```

### ✅ Example of correct code

```js
mockRequire('node:fs/promises', {
    readdir,
});
```

## add-await-to-re-import

### ❌ Example of incorrect code

```js
test('stop-all: should be called', (t) => {
    const read = reImport('./read');
    t.end();
});
```

### ✅ Example of correct code

```js
test('stop-all: should be called', async (t) => {
    const read = await reImport('./read');
    t.end();
});
```

## add-stop-all

When you write test mocking `ESM` with [`mockImport()`](https://github.com/coderaiser/mock-import#mockimportname-mock) never forget to call [`stopAll()`](https://github.com/coderaiser/mock-import#stopall) when you no longer need it. This leads to bugs in tests which are hard to find, each test should be checked with the one which pass when called alone but fail when called with others.

### ❌ Example of incorrect code

```js
test('stop-all: should be called', (t) => {
    mockImport('fs/promises', {
        readFile: stub(),
    });
    
    t.end();
});
```

### ✅ Example of correct code

```js
test('stop-all: should be called', (t) => {
    mockImport('fs/promises', {
        readFile: stub(),
    });
    
    stopAll();
    t.end();
});
```

## remove-stop-all

When `reImport()` or `reRequire` not called, `stopAll()` is redundant and should be removed.

### ❌ Example of incorrect code

```js
test('some test', (t) => {
    stopAll();
    t.end();
});
```

### ✅ Example of correct code

```js
test('some test', (t) => {
    t.end();
});
```

## convert-mock-import-to-require

Convert [mockRequire](https://github.com/boblauer/mock-require) to [mockImport](https://github.com/coderaiser/mock-import).

### ❌ Example of incorrect code

```js
const mockRequire = require('mock-require');

const {reRequire, stopAll} = mockRequire;

test('', (t) => {
    mockRequire('fs/promises', {
        unlink: stub(),
    });
    
    const fn = reRequire('..');
    fn();
    
    stopAll();
    t.end();
});
```

### ✅ Example of correct code

```js
import {createMockImport} from 'mock-import';

const {
    mockImport,
    reImport,
    stopAll,
} = createMockImport(import.meta.url);

test('', async (t) => {
    mockImport('fs/promises', {
        unlink: stub(),
    });
    
    const fn = await reImport('..');
    fn();
    
    stopAll();
    t.end();
});
```

## License

MIT
