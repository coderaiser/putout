'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['rename-file-mts-to-ts', plugin],
    ],
});

test('typescript: rename-file-mts-to-ts: report', (t) => {
    t.report('rename-file-mts-to-ts', `Rename '/lib/hello.mts' to '/lib/hello.ts'`);
    t.end();
});

test('typescript: rename-file-mts-to-ts: transform', (t) => {
    t.transform('rename-file-mts-to-ts');
    t.end();
});
