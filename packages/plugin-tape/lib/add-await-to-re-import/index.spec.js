'use strict';

const {createTest} = require('@putout/test');
const addAwaitToReImport = require('.');

const test = createTest(__dirname, {
    'tape/add-await-to-re-import': addAwaitToReImport,
});

test('plugin-tape: add-await-to-re-import: report', (t) => {
    t.report('re-import', `Call 'reImport()' using await`);
    t.end();
});

test('plugin-tape: add-await-to-re-import: transform', (t) => {
    t.transform('re-import');
    t.end();
});

test('plugin-tape: add-await-to-re-import: transform: block', (t) => {
    t.transform('block');
    t.end();
});

