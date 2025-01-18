'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-index-to-import', plugin],
    ],
});

test('packages: add-index-to-import: report: add-index-to-import', (t) => {
    t.report('add-index-to-import', `Add 'index.js' to nested import`);
    t.end();
});

test('packages: add-index-to-import: transform: add-index-to-import', (t) => {
    t.transform('add-index-to-import');
    t.end();
});
