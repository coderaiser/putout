# @putout/test [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/test.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/test "npm"

Test runner for 🐊[**Putout**](https://github.com/coderaiser/putout#plugins-api). Basically it is [supercharged **tape**](https://github.com/coderaiser/supertape) with additional asseritions:

## Install

```
npm i @putout/test -D
```

## Autofix

Set environment variable `UPDATE=1` to update `transform` and `format` fixtures (both `source` and `fixed`).

☝️ *Remember that `-fix.js` fixtures will be removed when used in `noReport`, `noTransform` and `noTransformWithOptions`*

```sh
UPDATE=1 tape test/*.js
```

## Plugins API

🐊**Putout** can be used in all IDE's supported by`ESLint` as [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/packages/eslint-plugin-putout).
When [async rules will be supported](https://github.com/eslint/eslint/issues/15394) we can switch to `ESM`.

To write test for your plugins you need initialize `test` using `createTest`:

```js
import {createTest} from '@putout/test';
import * as rmVars from '@putout/plugin-remove-unused-variables';

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
});
```

You can also pass all 🐊**Putout** options:

```js
const test = createTest(import.meta.url, {
    plugins: [
        ['remove-unused-variables', rmVars],
    ],
});
```

Or use another linter with the same signature as 🐊**Putout** using `lint` field:

```js
const test = createTest(import.meta.url, {
    lint: putout,
    plugins: [
        ['remove-unused-variables', rmVars],
    ],
});
```

### `report(filename, message: string | string[])`

Check error message (or messages) of a plugin:

```js
test('remove useless variables: dot', (t) => {
    t.report('dot', 'Dot files should be added to .gitignore');
    t.end();
});
```

When you want to check that report called exact count of times pass an array of messages:

```js
test('remove useless variables: dot', (t) => {
    t.report('dot', ['Dot files should be added to .gitignore']);
    t.end();
});
```

### `reportCode(input, message)`

Check error message of a plugin from `input` code:

```js
test('remove debugger: report', (t) => {
    t.reportCode('debugger', 'Unexpected "debugger" statement');
    t.end();
});
```

### `transform(filename [, output, plugins])`

Check transform of `filename.js` -> `filename-fix.js` in `test/fixtures` directory:

```js
test('remove useless variables: array-from', (t) => {
    t.transform('array-from', {
        'remove-useless-array-from': removeUselessArrayFrom,
    });
    t.end();
});
```

*☝️When input and output the same test fails. Use [`noTransform()`](#notransformfilename) for such cases.*

### `transformCode(input, output)`

Check transform of `input` -> `output` code:

```js
test('remove-console: property identifier: code', (t) => {
    t.transformCode('console.log()', '');
    t.end();
});
```

### `reportWithOptions(filename, options)`

Check report of `filename.js` with `options`:

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

Check no report of `filename.js` with `options`:

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

Check transform of `filename.js` with `options`:

```js
test('putout: plugin: declare-undefined-variables: transform: parse', (t) => {
    t.transformWithOptions('parse', {
        dismiss: [
            'assign',
            'stringify',
        ],
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

Check transform of `filename.js` with `options`:

```js
test('putout: plugin: declare-undefined-variables: transform: assign: dismiss', (t) => {
    t.noTransformWithOptions('assign', {
        dismiss: [
            'assign',
            'stringify',
        ],
    });
    t.end();
});
```

### `noReport(filename)`

Check error message of a plugin not produces

```js
test('plugin-putout: check-replace-code: no report: typescript', (t) => {
    t.noReport('typescript');
    t.end();
});
```

### `noReportAfterTransform(filename)`

Check error message of a plugin not produced

```js
test('test: no report after transform', (t) => {
    t.noReportAfterTransform('file');
    t.end();
});
```

### `noReportAfterTransformWithOptions(filename)`

Check error message of a plugin not produced with provided options:

```js
test('test: no report', (t) => {
    t.noReportAfterTransformWithOptions('file');
    t.end();
});
```

### `noTransform(filename)`

Check transform of `filename.js` produce nothing

```js
test('plugin-apply-numeric-separators: no transform: hex', (t) => {
    t.noTransform('hex');
    t.end();
});
```

### `progress(filename, expected)`

Check progress of `filename.js`;

```js
test('remove useless variables: for-of', async ({progress}) => {
    await progress('progress', {
        i: 0,
        n: 2,
        rule: 'read-all-files',
    });
});
```

### `progressWithOptions(filename, options, expected)`

Check progress of `filename.js`;

```js
test('remove useless variables: for-of', async ({progressWithOptions}) => {
    const options = {
        from: '/home/coderaiser',
        to: '/',
    };
    
    await progressWithOptions('progress', options, {
        i: 0,
        n: 2,
        rule: 'read-all-files',
    });
});
```

## Formatters API

First you need to create test with:

```js
import {createTest} from '@putout/test';
import * as rmVars from '@putout/plugin-remove-unused-variables';

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
});
```

### `format(formatter, filename)`

Check file name formatting (pass `process.env.UPDATE=1` to save `fixture`):

```js
test('formatter: codeframe', async ({format}) => {
    await format(codeframe);
});
```

### `noFormat`

Check that there is no formatting for for such file:

```js
test('formatter: codeframe: no', async ({noFormat}) => {
    await noFormat(codeframe, 'no');
});
```

### `formatMany(formatter, [filename1, filename2])`

Check file name formatting (pass `process.env.UPDATE=1` to save `fixture`):

```js
test('formatter: dump: many', async ({formatMany}) => {
    await formatMany(dump, ['var', 'var']);
});
```

#### Usage Example

Here is example of tests for [remove-console](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-console):

```js
const {createTest} = require('@putout/test');
const removeConsole = require('@putout/plugin-remove-console');

const test = createTest(__dirname, {
    'remove-console': removeConsole,
});

test('remove-console: report: property-identifier', (t) => {
    t.report('property-identifier', 'Unexpected "console" call');
    t.end();
});

test('remove-console: property-identifier', (t) => {
    t.transform('property-identifier');
    t.end();
});

// when code should not be transformed
test('test: declared', (t) => {
    t.noTransformCode('alert()');
    t.end();
});
```

## ESLint API

First you need to create test with:

```js
import {createTest} from '@putout/test/eslint';

const test = createTest(import.meta.url, config);
```

### `process(filename [, config])`

Works in similar to [transform](#transformfilename--output-plugins) way:

- ✅ reads `operator-linebreak.js`;
- ✅ transforms it;
- ✅ check that transformed is equal to `operator-linebreak-fix.js`;

Example:

```js
test('test: eslint: transform', async ({process}) => {
    await process('operator-linebreak');
});

test('test: eslint: transform', async ({process}) => {
    await process('operator-linebreak', {
        rules: {
            'putout/putout': {
                rules: {
                    'convert-esm-to-commonjs': 'on',
                },
            },
        },
    });
});
```

*☝️When input and output the same test fails. Use [`noProcess()`](#noprocessfilename--overrides) for such cases.*

### `noProcess(filename [, overrides])`

Check that filename would not be processed.

Example:

```js
test('test: eslint: noProcess', async ({noProcess}) => {
    await noProcess('operator-linebreak-fix');
});

test('test: eslint: noProcess', async ({noProcess}) => {
    await noProcess('operator-linebreak-fix', {
        rules: {
            'putout/putout': ['error', {}],
        },
    });
});
```

### `comparePlaces(filename, places[, overrides])`

```js
test('eslint-config: operator-line-break', async ({comparePlaces}) => {
    await comparePlaces('operator-linebreak', [{
        message: 'There should be no line break before or after \'=\'.',
        position: {
            column: 1,
            line: 2,
        },
        rule: 'operator-linebreak (eslint)',
    }]);
});
```

with `overrides`:

```js
test('eslint-config: operator-line-break', async ({comparePlaces}) => {
    const overrides = {
        extends: ['plugin:putout/safe'],
    };
    
    await comparePlaces('operator-linebreak', [{
        message: 'There should be no line break before or after \'=\'.',
        position: {
            column: 1,
            line: 2,
        },
        rule: 'operator-linebreak (eslint)',
    }], overrides);
});
```

### `transform(name)`

```js
test('test: eslint: transform: remove-debugger', (t) => {
    t.transform('remove-debugger');
    t.end();
});
```

### `report(filename, message | []messages)`

```js
test('test: eslint: report: remove-debugger', (t) => {
    t.report('remove-debugger', `Avoid 'debugger' statement`);
    t.end();
});
```

## Processors API

With `processors api` you can test `processors` in a simplest possible way.

First things first, init `test` with:

```js
import {createTest} from '@putout/test/processor';

const test = createTest(import.meta.url, {
    extension: 'json',
    processors: ['json'],
    plugins: ['eslint'],
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
