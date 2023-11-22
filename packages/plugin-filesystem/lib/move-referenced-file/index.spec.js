'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['move-referenced-file', plugin],
    ],
});

test('packages: move-referenced-file: report', (t) => {
    t.report('move-referenced-file', `Rename '/src/hello.js' to '/lib/hello.js'`);
    t.end();
});

test('packages: move-referenced-file: transform', (t) => {
    t.transform('move-referenced-file');
    t.end();
});
