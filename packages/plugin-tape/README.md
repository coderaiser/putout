# @putout/plugin-tape [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-tape.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-tape"npm"

> Tape-inspired TAP-compatible simplest high speed test runner with superpowers.
>
> (c) 📼[**Supertape**](https://github.com/coderaiser/supertape)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to apply best parctises for tests written with 📼[**Supertape**](https://github.com/coderaiser/supertape).

## Install

```
npm i @putout/plugin-tape -D
```

## Rules

- ✅ [add-args](#add-args);
- ✅ [add-await-to-re-import](#add-await-to-re-import);
- ✅ [add-node-prefix-to-mock-require](#add-node-prefix-to-mock-require);
- ✅ [add-stop-all](#add-stop-all);
- ✅ [add-t-end](#add-t-end);
- ✅ [apply-destructuring](#apply-destructuring);
- ✅ [apply-stub](#apply-stub);
- ✅ [apply-with-name](#apply-with-name);
- ✅ [convert-called-with-args](#convert-called-with-args);
- ✅ [convert-called-with-no-args-to-called-with](#convert-called-with-no-args-to-called-with);
- ✅ [convert-called-with-to-called-with-no-args](#convert-called-with-to-called-with-no-args);
- ✅ [convert-deep-equal-to-equal](#convert-deep-equal-to-equal);
- ✅ [convert-does-not-throw-to-try-catch](#convert-does-not-throw-to-try-catch);
- ✅ [convert-emitter-to-promise](#convert-emitter-to-promise);
- ✅ [convert-equal-to-called-once](#convert-equal-to-called-once);
- ✅ [convert-equal-to-deep-equal](#convert-equal-to-deep-equal);
- ✅ [convert-equal-to-not-ok](#convert-equal-to-not-ok);
- ✅ [convert-equal-to-ok](#convert-equal-to-ok);
- ✅ [convert-equals-to-equal](#convert-equals-to-equal);
- ✅ [convert-match-regexp-to-string](#convert-match-regexp-to-string);
- ✅ [convert-mock-require-to-mock-import](#convert-mock-require-to-mock-import);
- ✅ [convert-ok-to-called-with](#convert-ok-to-called-with);
- ✅ [convert-ok-to-match](#convert-ok-to-match);
- ✅ [convert-tape-to-supertape](#convert-tape-to-supertape);
- ✅ [convert-throws-to-try-catch](#convert-throws-to-try-catch);
- ✅ [declare](#declare);
- ✅ [jest](#jest);
- ✅ [remove-default-messages](#remove-default-messages);
- ✅ [remove-only](#remove-only);
- ✅ [remove-skip](#remove-skip);
- ✅ [remove-stop-all](# [remove-stop-all);
- ✅ [remove-useless-not-called-args](#remove-useless-not-called-args);
- ✅ [remove-useless-t-end](#remove-useless-t-end);
- ✅ [switch-expected-with-result](#switch-expected-with-result);
- ✅ [sync-with-name](#sync-with-name);

## Config

```json
{
    "rules": {
        "tape/convert-mock-require-to-mock-import": "off",
        "tape/jest": "on",
        "tape/apply-stub": "on",
        "tape/apply-destructuring": "on",
        "tape/apply-with-name": "on",
        "tape/add-t-end": "on",
        "tape/add-stop-all": "on",
        "tape/add-await-to-re-import": "on",
        "tape/add-node-prefix-to-mock-require": "on",
        "tape/remove-useless-t-end": "on",
        "tape/sync-with-name": "on",
        "tape/switch-expected-with-result": "on",
        "tape/convert-tape-to-supertape": "on",
        "tape/convert-throws-to-try-catch": "on",
        "tape/convert-does-not-throw-to-try-catch": "on",
        "tape/convert-called-with-args": "on",
        "tape/convert-called-with-to-called-with-no-args": "on",
        "tape/convert-called-with-no-args-to-called-with": "on",
        "tape/convert-equal-to-called-once": "on",
        "tape/convert-equal-to-deep-equal": "on",
        "tape/convert-equals-to-equal": "on",
        "tape/convert-deep-equal-to-equal": "on",
        "tape/convert-emitter-to-promise": "on",
        "tape/convert-ok-to-match": "on",
        "tape/convert-ok-to-called-with": "on",
        "tape/convert-match-regexp-to-string": "on",
        "tape/add-args": "on",
        "tape/declare": "on",
        "tape/remove-default-messages": "on",
        "tape/remove-useless-not-called-args": "on",
        "tape/remove-only": "on",
        "tape/remove-skip": "on",
        "tape/remove-stop-all": "on"
    }
}
```

## jest

🐊**Putout** gives ability to switch easily from [**Jest**](https://github.com/coderaiser/putout/blob/master/packages/plugin-jest/README.md#putoutplugin-jest-) to 📼**Supertape**. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e610ded68d5808c2dbc09a1f84be8a96/c8f515668b5bdf16b58ef85c3ca13d93682f3ccb).

### ❌ Example of incorrect code

```js
it('should equal', () => {
    expect(a).toEqual(b);
});
```

### ✅ Example of correct code

```js
import {test} from 'supertape';

test('should equal', () => {
    t.equal(a, b);
    t.end();
});
```

## switch-expected-with-result

📼**Supertape** uses more natural way of
comparing: first you pass `result` and then `expected`.

It gives you ability to use value instead of `expected` and
understand code faster: no need to search for a second argument.
While `result` is always a variable, so it most likely much shorter.

### ❌ Example of incorrect code

```js
test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    t.equal(expected, result);
    t.end();
});
```

### ✅ Example of correct code

```js
test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    t.equal(result, expected);
    t.end();
});
```

## convert-tape-to-supertape

### ❌ Example of incorrect code

```js
const test = require('tape');
```

### ✅ Example of correct code

```js
const test = require('supertape');
```

## convert-throws-to-try-catch

### ❌ Example of incorrect code

```js
const test = require('supertape');

test('some message', (t) => {
    t.throws(copymitter, /from should be a string!/, 'should throw when no args');
    t.end();
});
```

### ✅ Example of correct code

```js
const tryCatch = require('try-catch');
const test = require('supertape');

test('some message', (t) => {
    const [error] = tryCatch(copymitter);
    
    t.equal(error.message, 'from shoulde be a string!', 'should throw when no args');
    t.end();
});
```

## convert-does-not-throw-to-try-catch

### ❌ Example of incorrect code

```js
const test = require('supertape');

test('some message', (t) => {
    t.doesNotThrow(copymitter, 'should throw when no args');
    t.end();
});
```

### ✅ Example of correct code

```js
const test = require('supertape');
const tryCatch = require('try-catch');

test('some test', (t) => {
    const [error] = tryCatch(copymitter);
    
    t.notOk(error, 'should not throw when no args');
    t.end();
});
```

## convert-called-with-args

### ❌ Example of incorrect code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    const fn = stub();
    fn();
    
    t.calledWith(fn, 'hello');
    t.end();
});
```

### ✅ Example of correct code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    const fn = stub();
    fn();
    
    t.calledWith(fn, ['hello']);
    t.end();
});
```

## convert-equal-to-called-once

No need to use [`equal`](https://github.com/coderaiser/supertape#tequalactual-expected-msg), [`supertape`](https://github.com/coderaiser/supertape) supports [`calledOnce`](https://github.com/coderaiser/supertape/tree/master/packages/operator-stub#tcalledoncefn--message).

### ❌ Example of incorrect code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    const fn = stub();
    fn();
    
    t.equal(fn.callCount, 1);
    t.end();
});
```

### ✅ Example of correct code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    const fn = stub();
    fn();
    
    t.calledOnce(fn);
    t.end();
});
```

## convert-deep-equal-to-equal

Use [`equal`](https://github.com/coderaiser/supertape#tequalactual-expected-msg) when comparing with primitives, [`deepEqual`](https://github.com/coderaiser/supertape#tdeepequalactual-expected-msg) for [`Objects`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) and [`Arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array);

### ❌ Example of incorrect code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    t.deepEqual(x, 5);
    t.end();
});
```

### ✅ Example of correct code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    t.equal(x, 5);
    t.end();
});
```

## convert-called-with-to-called-with-no-args

### ❌ Example of incorrect code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    const fn = stub();
    fn();
    
    t.calledWith(fn);
    t.end();
});
```

### ✅ Example of correct code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    const fn = stub();
    fn();
    
    t.calledWithNoArgs(fn);
    t.end();
});
```

## convert-called-with-no-args-to-called-with

### ❌ Example of incorrect code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    const fn = stub();
    fn();
    
    t.calledWithNoArgs(fn, [1, 2]);
    t.end();
});
```

### ✅ Example of correct code

```js
const test = require('supertape');
const {stub} = test;

test('some message', (t) => {
    const fn = stub();
    fn();
    
    t.calledWith(fn, [1, 2]);
    t.end();
});
```

## convert-emitter-to-promise

### ❌ Example of incorrect code

```js
test('copymitter', (t) => {
    const cp = copymitter(from, to, ['1']);
    
    cp.on('end', (t) => {
        t.end();
    });
});
```

### ✅ Example of correct code

```js
const {once} = require('node:events');

test('copymitter', async (t) => {
    const cp = copymitter(from, to, ['1']);
    
    await once(cp, 'end');
    
    t.end();
});
```

## apply-destructuring

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/adf238850271c0a4ad917e71bab8757c/4ff416c3d9f3de0930339c7a4929eb4b62461d1a).

### ❌ Example of incorrect code

```js
const test = require('supertape');
const {stub} = test;
```

### ✅ Example of correct code

```js
const {test, stub} = require('supertape');
```

## apply-stub

Apply [stub](https://github.com/cloudcmd/stub) functions created. Look how it works in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d098a8c8d03a072a7f3981e3cfb1d7af/f1542bfa39513ac625b2a9cd9243cc06dee286c0).

### ❌ Example of incorrect code

```js
const a = async () => true;
const b = async () => {};
const c = async () => throwError('hello');

const d = async () => {
    throw Error('hello');
};
```

### ✅ Example of correct code

```js
const a = stub().resolves(true);
const b = stub().resolves();
const c = stub().rejects(Error('hello'));
const d = stub().rejects(Error('hello'));
```

## apply-with-name

### ❌ Example of incorrect code

```js
test('should call init before show', (t) => {
    const init = stub();
    const show = stub();
    
    t.calledInOrder([init, show]);
    t.end();
});
```

### ✅ Example of correct code

```js
test('should call init before show', (t) => {
    const init = stub().withName('init');
    const show = stub().withName('show');
    
    t.calledInOrder([init, show]);
    t.end();
});
```

## sync-with-name

### ❌ Example of incorrect code

```js
test('should call init before show', (t) => {
    const init = stub().withName('show');
    const show = stub().withName('show');
    
    t.calledInOrder([init, show]);
    t.end();
});
```

### ✅ Example of correct code

```js
test('should call init before show', (t) => {
    const init = stub().withName('init');
    const show = stub().withName('show');
    
    t.calledInOrder([init, show]);
    t.end();
});
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

## add-args

### ❌ Example of incorrect code

```js
test('xxx', () => {
    t.end();
});
```

### ✅ Example of correct code

```js
test('xxx', (t) => {
    t.end();
});
```

## add-t-end

### ❌ Example of incorrect code

```js
test('xxx', () => {});
```

### ✅ Example of correct code

```js
test('xxx', (t) => {
    t.end();
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

## remove-useless-t-end

### ❌ Example of incorrect code

```js
test('test: remove me', () => {
    t.end();
    t.end();
});
```

### ✅ Example of correct code

```js
test('test: remove me', () => {
    t.end();
});
```

## convert-ok-to-match

### ❌ Example of incorrect code

```js
t.ok(result.includes('hello'));
```

### ✅ Example of correct code

```js
t.match(result, /hello/);
```

## convert-ok-to-called-with

### ❌ Example of incorrect code

```js
t.ok(set.calledWith(1, 2));
```

### ✅ Example of correct code

```js
t.calledWith(set, [1, 2]);
```

## convert-equal-to-not-ok

### ❌ Example of incorrect code

```js
t.equal(error, null);
```

### ✅ Example of correct code

```js
t.notOk(error);
```

## convert-equal-to-ok

### ❌ Example of incorrect code

```js
t.equal(result, true);
```

### ✅ Example of correct code

```js
t.ok(result);
```

## convert-equal-to-deep-equal

### ❌ Example of incorrect code

```js
const expected = {
    hello: 'world',
};

t.equal(error, expected);
t.end();
```

### ✅ Example of correct code

```js
const expected = {
    hello: 'world',
};

t.deepEqual(error, expected);
t.end();
```

## convert-equals-to-equal

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9a428ce99c5ec8966363a7a6da5bbba8/7441cbf7c8429b265259e7d67125fa138d7db19b).

### ❌ Example of incorrect code

```js
t.equals(e.message, 'token should be a string!', 'should throw');
```

### ✅ Example of correct code

```js
t.equal(e.message, 'token should be a string!', 'should throw');
```

## convert-match-regexp-to-string

### ❌ Example of incorrect code

```js
t.match(result, RegExp('hello'));
```

### ✅ Example of correct code

```js
t.match(result, 'hello');
```

## remove-default-messages

📼**Supertape** will put this information for you, and it is always the same.
No need to repeat the same information twice on one line, better to avoid it.

### ❌ Example of incorrect code

```js
t.equal(result, expected, 'should equal');
```

### ✅ Example of correct code

```js
t.equal(result, expected);
```

## remove-useless-not-called-args

### ❌ Example of incorrect code

```js
t.notCalled(fn, []);
```

### ✅ Example of correct code

```js
t.notCalled(fn);
```

## remove-only

### ❌ Example of incorrect code

```js
test.only('some test', (t) => {
    t.end();
});

testDeclareBeforeReference.only('some test', (t) => {
    t.end();
});
```

### ✅ Example of correct code

```js
test('some test', (t) => {
    t.end();
});

testDeclareBeforeReference('some test', (t) => {
    t.end();
});
```

## remove-skip

### ❌ Example of incorrect code

```js
test.skip('some test', (t) => {
    t.end();
});
```

### ✅ Example of correct code

```js
test('some test', (t) => {
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
