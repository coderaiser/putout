'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
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

test('packages: write-all-files: progress', async ({progress}) => {
    await progress('write-all-files', {
        i: 1,
        n: 2,
        percent: '50%',
        rule: 'write-all-files',
    });
});
