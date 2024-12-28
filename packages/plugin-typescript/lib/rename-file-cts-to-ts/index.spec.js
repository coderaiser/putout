'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['rename-file-cts-to-ts', plugin],
    ],
});

test('typescript: rename-file-cts-to-ts: report', (t) => {
    t.report('rename-file-cts-to-ts', `Rename '/lib/hello.cts' to '/lib/hello.ts'`);
    t.end();
});

test('typescript: rename-file-cts-to-ts: transform', (t) => {
    t.transform('rename-file-cts-to-ts');
    t.end();
});
