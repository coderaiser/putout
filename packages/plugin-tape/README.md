# @putout/plugin-tape [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-tape.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-tape"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-tape
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-tape

`putout` plugin helps to apply best parctises for tests written with [supertape](https://github.com/coderaiser/supertape).

## Install

```
npm i @putout/plugin-tape -D
```

## Rules

```json
{
    "rules": {
        "tape/switch-expected-with-result": "on",
        "tape/convert-tape-to-supertape": "on",
        "tape/convert-throws-to-try-catch": "on",
        "tape/convert-does-not-throw-to-try-catch": "on",
        "tape/convert-called-with-args": "on",
        "tape/convert-called-with-to-called-with-no-args": "on",
        "tape/convert-called-with-no-args-to-called-with": "on",
        "tape/expand-try-catch-arguments": "on",
        "tape/apply-stub-operator": "on",
        "tape/convert-emitter-to-promise": "on",
        "tape/convert-ok-to-match": "on",
        "tape/convert-ok-to-called-with": "on",
        "tape/convert-match-regexp-to-string": "on",
        "tape/declare-stub": "on",
        "tape/declare-t": "on"
    }
}
```

## switch-expected-with-result

### ❌ Incorrect code example

```js
test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    t.eqaul(expected, result);
    t.end();
});
```

### ✅ Correct code example

```js
test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    t.eqaul(result, expected);
    t.end();
});
```

## convert-tape-to-supertape

### ❌ Incorrect code example

```js
const test = require('tape');
```

### ✅ Correct code example

```js
const test = require('supertape');
```

## convert-throws-to-try-catch

### ❌ Incorrect code example

```js
const test = require('supertape');

test('some message', (t) => {
    t.throws(copymitter, /from should be a string!/, 'should throw when no args');
    t.end();
});
```

### ✅ Correct code example

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

### ❌ Incorrect code example

```js
const test = require('supertape');

test('some message', (t) => {
    t.doesNotThrow(copymitter, 'should throw when no args');
    t.end();
});
```

### ✅ Correct code example

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

### ❌ Incorrect code example

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

### ✅ Correct code example

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

### ✅ Correct code example

```js
const tryCatch = require('try-catch');
const test = require('supertape');

test('some message', (t) => {
    const [error] = tryCatch(copymitter);
    
    t.notOk(error, 'should throw when no args');
    t.end();
});
```

## convert-called-with-to-called-with-no-args

### ❌ Incorrect code example

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

### ✅ Correct code example

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

### ❌ Incorrect code example

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

### ✅ Correct code example

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

### ❌ Incorrect code example

```js
test('copymitter', (t) => {
    const cp = copymitter(from, to, ['1']);
    
    cp.on('end', (t) => {
        t.end();
    });
});
```

### ✅ Correct code example

```js
const {once} = require('events');
test('copymitter', async (t) => {
    const cp = copymitter(from, to, ['1']);
    
    await once(cp, 'end');
    t.end();
});
```

## expand-try-catch-arguments

### ❌ Incorrect code example

```js
import tryCatch from 'try-catch';
test('some message', (t) => {
    const fn = () => copymitter('/hello');
    const [error] = tryCatch(fn);
    
    t.equal(error.message, 'to should be a string!');
    t.end();
});
```

### ✅ Correct code example

```js
import tryCatch from 'try-catch';
test('some message', (t) => {
    const [error] = tryCatch(copymitter, '/hello');
    
    t.equal(error.message, 'to should be a string!');
    t.end();
});
```

## apply-stub-operator

### ❌ Incorrect code example

```js
test('some message', (t) => {
    t.ok(fn.calledWith(a));
    t.end();
});
```

### ✅ Correct code example

```js
test('some message', (t) => {
    t.calledWith(fn, [a]);
    t.end();
});
```

## declare-stub

### ❌ Incorrect code example

```js
const test = require('supertape');

test('xxx', (t) => {
    const a = stub();
    
    t.end();
});
```

### ✅ Correct code example

```js
const {test, stub} = require('supertape');

test('xxx', (t) => {
    const a = stub();
    
    t.end();
});
```

## declare-t

### ❌ Incorrect code example

```js
test('xxx', () => {
    t.end();
});
```

### ✅ Correct code example

```js
test('xxx', (t) => {
    t.end();
});
```

## convert-ok-to-match

### ❌ Incorrect code example

```js
t.ok(result.includes('hello'));
```

### ✅ Correct code example

```js
t.match(result, /hello/);
```

## convert-ok-to-match

### ❌ Incorrect code example

```js
t.ok(set.calledWith(1, 2));
```

### ✅ Correct code example

```js
t.calledWith(set, [1, 2]);
```

## convert-equal-to-not-ok

### ❌ Incorrect code example

```js
t.equal(error, null);
```

### ✅ Correct code example

```js
t.notOk(error);
```

## convert-equal-to-ok

### ❌ Incorrect code example

```js
t.equal(result, true);
```

### ✅ Correct code example

```js
t.ok(result);
```

## convert-match-regexp-to-string

### ❌ Incorrect code example

```js
t.match(result, RegExp('hello'));
```

### ✅ Correct code example

```js
t.match(result, 'hello');
```

## remove-default-messages

`supertape` will put this information for you, and it is always the same.
No need to repeat the same information twice on one line, better to avoid it.

### ❌ Incorrect code example

```js
t.equal(result, expected, 'should equal');
```

### ✅ Correct code example

```js
t.equal(result, expected);
```

## License

MIT
