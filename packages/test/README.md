# @putout/test [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/test.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/test "npm"

Test runner for 🐊[`Putout`](https://github.com/coderaiser/putout#plugins-api). Basically it is [supercharged `tape`](https://github.com/coderaiser/supertape) with aditional asseritions:

## Install

```
npm i @putout/test -D
```

## Autofix

Set environment variable `UPDATE=1` to update `transform` and `format` fixtures.

```sh
UPDATE=1 tape test/*.js
```

## Plugins API

All plugins 🐊`Putout` plugins written in `CommonJS`, since `ESLint` written on `CommonJS` and we have a huge `ESLint`-based ecosystem wich is good to reuse.
`🐊`Putout`can be used in all IDE's supported by`ESLint` as [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/packages/eslint-plugin-putout).
When [async rules will be supported](https://github.com/eslint/eslint/issues/15394) we can switch to `ESM`.

To write test for your plugins you need initialize `test` using `createTest`:

```js
import {createTest} from '@putout/test';
const rmVars = require('@putout/plugin-remove-unused-variables');

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
});
```

### `report(filename, message | []messages)`

checks error message (or messages) of a plugin

```js
test('remove usless variables: for-of', (t) => {
    t.report('dot', 'Dot files should be added to .gitignore');
    t.end();
});
```

### `reportCode(input, message)`

checks error message of a plugin from `input` code

```js
test('remove debugger: report', (t) => {
    t.reportCode('debugger', 'Unexpected "debugger" statement');
    t.end();
});
```

### `transform(filename [, output, plugins])`

check transform of `filename.js` -> `filename-fix.js` in `test/fixtures` directory

```js
test('remove usless variables: for-of', (t) => {
    t.transform('array-from', {
        'remove-useless-array-from': removeUselessArrayFrom,
    });
    t.end();
});
```

### `transformCode(input, output)`

check transform of `input` -> `output` code

```js
test('remove-console: property identifier: code', (t) => {
    t.transformCode('console.log()', '');
    t.end();
});
```

### `reportWithOptions(filename, options)`

check report of `filename.js` with `options`

```js
test('putout: test: reportWithOptions', (t) => {
    const cache = new Map();
    cache.set('x', 'y');
    
    t.reportWithOptions('remove-import', 'avoid imports', {
        cache,
    });
    t.end();
});
```

### `noReportWithOptions(filename, options)`

check no report of `filename.js` with `options`

```js
test('putout: test: noReportWithOptions', (t) => {
    const cache = new Map();
    
    t.noReportWithOptions('remove-import', {
        cache,
    });
    t.end();
});
```

### `transformWithOptions(filename, options)`

check transform of `filename.js` with `options`

```js
test('putout: plugin: declare-undefined-variables: transform: parse', (t) => {
    t.transformWithOptions('parse', {
        dismiss: ['assign', 'stringify'],
    });
    t.end();
});
```

### `noTransformWithOptions(filename, options)`

When file should not be transformed:

```js
test('test: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
```

### `noTransformWithOptions(filename, options)`

check transform of `filename.js` with `options`

```js
test('putout: plugin: declare-undefined-variables: transform: assign: dismiss', (t) => {
    t.noTransformWithOptions('assign', {
        dismiss: ['assign', 'stringify'],
    });
    t.end();
});
```

### `noReport(filename)`

checks error message of a plugin not produces

```js
test('plugin-putout: check-replace-code: no report: typescript', (t) => {
    t.noReport('typescript');
    t.end();
});
```

### `noReportAfterTransform(filename)`

checks error message of a plugin not produced

```js
test('test: no report after transform', (t) => {
    t.noReportAfterTransform('file');
    t.end();
});
```

### `noTransform(filename)`

check transform of `filename.js` produce nothing

```js
test('plugin-apply-numeric-separators: no transform: hex', (t) => {
    t.noTransform('hex');
    t.end();
});
```

## Formatters API

First you need to create test with:

```js
import {createTest} from '@putout/test';
import rmVars from '@putout/plugin-remove-unused-variables';

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
});
```

### `format(formatter, filename)`

check file name formatting (pass `process.env.UPDATE=1` to save fixture)

```js
test('formatter: codeframe', async ({format}) => {
    await format(codeframe);
});
```

### `noFormat`

check that there is no formatting for for such file

```js
test('formatter: codeframe: no', async ({noFormat}) => {
    await noFormat(codeframe, 'no');
});
```

### `formatMany(formatter, [filename1, filename2])`

check file name formatting (pass `process.env.UPDATE=1` to save fixture)

```js
test('formatter: dump: many', async ({formatMany}) => {
    await formatMany(dump, ['var', 'var']);
});
```

#### Usage Example

Here is example of tests for [remove-console](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-console):

```js
const removeConsole = require('@putout/plugin-remove-console');
const {createTest} = require('@putout/test');

const test = createTest(__dirname, {
    'remove-console': removeConsole,
});

test('remove-console: report', (t) => {
    t.report('property-identifier', 'Unexpected "console" call');
    t.end();
});

test('remove-console: property identifier', (t) => {
    t.transform('property-identifier');
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

### `process(filename [, plugins, ])`

Example:

```js
test('putout: processor: json', async ({process}) => {
    await process('eslintrc');
});

test('putout: processor: json', async ({process}) => {
    await process('package', ['package-json']);
});
```

### `noProcess(filename [, plugins, processors])`

Check that filename would not be processed.

Example:

```js
test('putout: process: json: no process', async ({noProcess}) => {
    await noProcess('eslintrc', [], ['json']);
});
```

### `comparePlaces(filename, places)`

```js
test('putout: processor: css: places', async ({comparePlaces}) => {
    await comparePlaces('style', [{
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
