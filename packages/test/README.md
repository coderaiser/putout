# @putout/test [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/test.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/test "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/test-runner
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/test-runner

Test runner for [`putout plugins`](https://github.com/coderaiser/putout#plugins-api). Basically it is [supercharged `tape`](https://github.com/coderaiser/supertape) with aditional asseritions:

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

### report(filename, message | []messages)

checks error message (or messages) of a plugin

```js
test('remove usless variables: for-of', (t) => {
    t.report('dot', 'Dot files should be added to .gitignore');
    t.end();
});
```

### reportCode(input, message)

checks error message of a plugin from `input` code

```js
test('remove debugger: report', (t) => {
    t.reportCode('debugger', 'Unexpected "debugger" statement');
    t.end();
});
```

### transform(filename [, output, plugins])

check transform of `filename.js` -> `filename-fix.js` in `test/fixtures` directory

```js
test('remove usless variables: for-of', (t) => {
    t.transform('array-from', {
        'remove-useless-array-from': removeUselessArrayFrom,
    });
    t.end();
});
```

### transformCode(input, output)

check transform of `input` -> `output` code

```js
test('remove-console: property identifier: code', (t) => {
    t.transformCode('console.log()', '');
    t.end();
});
```

### reportWithOptions(filename, options)

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

### noReportWithOptions(filename, options)

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

### transformWithOptions(filename, options)

check transform of `filename.js` with `options`

```js
test('putout: plugin: declare-undefined-variables: transform: parse', (t) => {
    t.transformWithOptions('parse', {
        dismiss: ['assign', 'stringify'],
    });
    
    t.end();
});
```

### noTransformWithOptions(filename, options)

When file should not be transformed:

```js
test('test: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
```

### noTransformWithOptions(filename, options)

check transform of `filename.js` with `options`

```js
test('putout: plugin: declare-undefined-variables: transform: assign: dismiss', (t) => {
    t.noTransformWithOptions('assign', {
        dismiss: ['assign', 'stringify'],
    });
    t.end();
});
```

### noReport(filename)

checks error message of a plugin not produces

```js
test('plugin-putout: check-replace-code: no report: typescript', (t) => {
    t.noReport('typescript');
    t.end();
});
```

### noReportAfterTransform(filename)

checks error message of a plugin not produces

```js
test('test: no report after transform', (t) => {
    t.noReportAfterTransform('file');
    t.end();
});
```

### noTransform(filename)

check transform of `filename.js` produce nothing new

```js
test('plugin-apply-numeric-separators: no transform: hex', (t) => {
    t.noTransform('hex');
    t.end();
});
```

### format(formatter, filename)

check file name formatting (pass `process.env.UPDATE=1` to save fixture)

### noFormat

check that there is no formatting for for such file

```js
test('formatter: codeframe: no', (t) => {
    t.noFormat(codeframe, 'no');
    t.end();
});
```

### formatMany(formatter, [filename1, filename2])

check file name formatting (pass `process.env.UPDATE=1` to save fixture)

```js
test('formatter: dump: many', (t) => {
    t.formatMany(dump, ['var', 'var']);
    t.end();
});
```

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

### process(filename [, plugins, ])

Example:

```js
test('putout: processor: json', async ({process}) => {
    await process('eslintrc');
});

test('putout: processor: json', async ({process}) => {
    await process('package', ['package-json']);
});
```

### noProcess(filename [, plugins, processors])

Check that filename would not be processed.

Example:

```js
test('putout: process: json: no process', async ({noProcess}) => {
    await noProcess('eslintrc', [], ['json']);
});
```

### comparePlaces(filename, places)

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
