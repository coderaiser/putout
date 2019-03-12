# putout-test [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/test.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/test"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/test-runner
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/test-runner

Test runner for `putout plugins`. Basically it is [supercharged](https://github.com/coderaiser/supertape) `tape` with aditional asseritions:

- `report(filename, message)` - checks error message of a plugin
- `reportCode(input, message)` - checks error message of a plugin from `input` code
- `transform(filename [, output, plugins])` - check transform of `filename.js` -> `filename-fix.js` in `test/fixtures` directory.
- `transformCode(input, output)` - check transform of `input` -> `output` code

## Install

```
npm i @putout/test -D
```

## Usage

### test(dir, plugin)
- `dir` - directory that contains fixtures` subdirectory;
- `plugins` - plugin object contains `name of a plugin` and `plugin function`;

Here is example of tests for [remove-console](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-console):

```js
const removeConsole = require('./fixture/remove-console');
const test = require('@putout/test')(__dirname, {
    'remove-console': removeConsole
});

test('remove-console: report', (t) => {
    t.report('property-identifier', 'Unexpected "console" call');
    t.end();
});

test('remove-console: property identifier: code', (t) => {
    t.transformCode('console.log()', '');
    t.end();
});

test('remove-console: property identifier', (t) => {
    t.transform('property-identifier');
    t.end();
});

test('remove-console: property literal', (t) => {
    t.transform('property-literal', '\n\n');
    t.end();
});

// when file should not be transformed
test('test: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
```

## License

MIT

