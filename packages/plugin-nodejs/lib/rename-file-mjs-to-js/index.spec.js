'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['rename-file-mjs-to-js', plugin],
    ],
});

test('packages: rename-file-mjs-to-js: report', (t) => {
    t.report('rename-file-mjs-to-js', `Rename '/lib/hello.mjs' to '/lib/hello.js'`);
    t.end();
});

test('packages: rename-file-mjs-to-js: no report: no-mjs', (t) => {
    t.noReport('no-mjs');
    t.end();
});

test('packages: rename-file-mjs-to-js: transform', (t) => {
    t.transform('rename-file-mjs-to-js');
    t.end();
});

test('packages: rename-file-mjs-to-js: progress', async ({progress}) => {
    await progress('rename-file-mjs-to-js', {
        i: 1,
        n: 1,
        percent: '100%',
        rule: 'rename-file-mjs-to-js',
    });
});
