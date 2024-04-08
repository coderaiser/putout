'use strict';

const {createTest} = require('@putout/test');
const typescript = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'typescript/rename-file-cts-to-ts': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: rename-file-cts-to-ts: report', (t) => {
    t.report('rename-file-cts-to-ts-on', `Rename '/lib/hello.cts' to '/lib/hello.ts'`);
    t.end();
});

test('plugin-typescript: rename-file-cts-to-ts: transform', (t) => {
    t.transform('rename-file-cts-to-ts-on');
    t.end();
});
