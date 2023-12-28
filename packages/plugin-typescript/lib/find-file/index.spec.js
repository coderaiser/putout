'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['find-file', plugin],
    ],
});

test('packages: find-file: report', (t) => {
    t.report('find-file', `Remove useless type when declaring constant with primitive value`);
    t.end();
});

test('packages: find-file: transform', (t) => {
    t.transform('find-file');
    t.end();
});
