'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['write-all-files', plugin],
    ],
});

test('packages: write-all-files: report', (t) => {
    t.report('write-all-files', `Write all files`);
    t.end();
});

test('packages: write-all-files: transform', (t) => {
    t.transform('write-all-files');
    t.end();
});
