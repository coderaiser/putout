'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/add-await-to-re-import': require('.'),
});

test('plugin-tape: add-await-to-re-import: report', (t) => {
    t.report('re-import', `Call 'reImport()' using await`);
    t.end();
});

test('plugin-tape: add-await-to-re-import: transform', (t) => {
    t.transform('re-import');
    t.end();
});

