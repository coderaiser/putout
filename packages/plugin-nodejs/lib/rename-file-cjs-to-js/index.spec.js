'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['rename-file-cjs-to-js', plugin],
    ],
});

test('packages: rename-file-cjs-to-js: report', (t) => {
    t.report('rename-file-cjs-to-js', `Rename '/lib/hello.cjs' to '/lib/hello.js'`);
    t.end();
});

test('packages: rename-file-cjs-to-js: transform', (t) => {
    t.transform('rename-file-cjs-to-js');
    t.end();
});

test('packages: rename-file-cjs-to-js: progress', async ({progress}) => {
    await progress('rename-file-cjs-to-js', {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'rename-file-cjs-to-js',
    });
});

test('packages: rename-file-cjs-to-js: no report: no', (t) => {
    t.noReport('no');
    t.end();
});
