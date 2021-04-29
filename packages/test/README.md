# @putout/test [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/test.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/test"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/test-runner
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/test-runner

Test runner for `putout plugins`. Basically it is [supercharged](https://github.com/coderaiser/supertape) `tape` with aditional asseritions:

## Install

```
npm i @putout/test -D
```

## Plugins API

### report(filename, message)
checks error message of a plugin

### reportCode(input, message)
checks error message of a plugin from `input` code

### transform(filename [, output, plugins])
check transform of `filename.js` -> `filename-fix.js` in `test/fixtures` directory

### transformCode(input, output)
check transform of `input` -> `output` code

### reportWithOptions(filename, options)
check report of `filename.js` with `options`

### noReportWithOptions(filename, options)
check no report of `filename.js` with `options`

### transformWithOptions(filename, options)
check transform of `filename.js` with `options`

### noTransformWithOptions(filename, options)
check transform of `filename.js` with `options`

### noReport(filename)
checks error message of a plugin not produces

### noReportAfterTransform(filename)
checks error message of a plugin not produces

```js
test('test: no report after transform', (t) => {
    t.noReportAfterTransform('file');
    t.end();
});
```

### noReportCode(filename)
checks error message of a plugin not produces with a `code`

### noTransform(filename)
check transform of `filename.js` produce nothing

### format(formatter, filename)
check file name formatting (pass `process.env.UPDATE=1` to save fixture)

### formatMany(formatter, [filename1, filename2])
check file name formatting (pass `process.env.UPDATE=1` to save fixture)

#### Usage Example

Here is example of tests for [remove-console](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-console):

```js
const test = require('@putout/test')(__dirname, {
    'remove-console': require('..'),
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

// when code should not be transformed
test('test: declared', (t) => {
    t.noTransformCode('alert()');
    t.end();
});
```

## Processors API

With `processors api` you can test `processors` in a simplest possible way.

First things first, init `test` with:

```js
const {createTest} = require('@putout/test/processor');

const test = createTest(__dirname, {
    extension: 'json',
    processors: [
        'json',
    ],
    plugins: [
        'eslint',
    ],
});

```

### process(filename [, plugins, ])

Example:

```js
test('putout: processor: json', async (t) => {
    await t.process('eslintrc');
});

test('putout: processor: json', async (t) => {
    await t.process('package', ['package-json']);
});
```

### comparePlaces(filename, places)

```js
test('putout: processor: css: places', async (t) => {
    await t.comparePlaces('style', [{
        message: 'Expected indentation of 4 spaces (indentation)',
        position: {
            column: 1,
            line: 2,
        },
        rule: 'indentation (stylelint)',
    }]);
});
```

## License

MIT

