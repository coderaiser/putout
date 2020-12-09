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
        "tape/convert-tape-to-supertape": "on"
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

## License

MIT
