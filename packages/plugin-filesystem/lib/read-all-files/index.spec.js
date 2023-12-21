'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['read-all-files', plugin],
    ],
});

test('packages: read-all-files: report', (t) => {
    t.report('read-all-files', `Read all files`);
    t.end();
});

test('packages: read-all-files: transform', (t) => {
    t.transform('read-all-files');
    t.end();
});

test('packages: read-all-files: progress', async ({progress}) => {
    await progress('read-all-files', {
        i: 1,
        n: 2,
        percent: '50%',
        rule: 'read-all-files',
    });
});
