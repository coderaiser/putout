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
        "tape/expand-try-catch-arguments": "on",
        "tape/apply-stub-operator": "on"
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

### ✅ Correct code Example

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

### ✅ Correct code Example

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

### ✅ Correct code Example

```js
const tryCatch = require('try-catch');
const test = require('supertape');

test('some message', (t) => {
    const [error] = tryCatch(copymitter);
    
    t.equal(error.message, 'from should be a string!', 'should throw when no args');
    t.end();
});
```

## expand-try-catch-arguments

### ❌ Incorrect code example

```js
test('some message', (t) => {
    const fn = () => copymitter('/hello');
    const [error] = tryCatch(fn);
    
    t.equal(error.message, 'to should be a string!');
    t.end();
});
```

### ✅ Correct code Example

```js
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

### ✅ Correct code Example

```js
test('some message', (t) => {
    const [error] = tryCatch(copymitter, '/hello');
    
    t.calledWith(fn, [a]);
    t.end();
});
```

## License

MIT
