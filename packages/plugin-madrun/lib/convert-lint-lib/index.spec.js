'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-lint-lib': require('.'),
});

test('madrun: convert lint:lib: report', (t) => {
    t.report('lint', '"lint" should be used instead of "lint:lib"');
    t.end();
});

test('madrun: convert: lint: lib: transform', (t) => {
    t.transform('lint');
    t.end();
});

