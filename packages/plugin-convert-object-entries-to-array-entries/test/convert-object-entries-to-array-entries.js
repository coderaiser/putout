'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    'convert-object-entries-to-array-entries': plugin,
});

test('plugin-convert-object-entries-to-array-entries: report', (t) => {
    t.report('convert-object-entries-to-array-entries', `Use 'array.entries()' instead of 'Object.entries()'`);
    t.end();
});

test('plugin-convert-object-entries-to-array-entries: transform', (t) => {
    t.transform('convert-object-entries-to-array-entries');
    t.end();
});

