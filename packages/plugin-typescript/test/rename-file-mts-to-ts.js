'use strict';

const {createTest} = require('@putout/test');
const typescript = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'typescript/rename-file-mts-to-ts': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: rename-file-mts-to-ts: report', (t) => {
    t.report('rename-file-mts-to-ts-on', `Rename '/lib/hello.mts' to '/lib/hello.ts'`);
    t.end();
});

test('plugin-typescript: rename-file-mts-to-ts: transform', (t) => {
    t.transform('rename-file-mts-to-ts-on');
    t.end();
});
