'use strict';

const {createTest} = require('@putout/test');

const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['add-await-to-progress', plugin],
    ],
});

test('packages: add-await-to-progress: report', (t) => {
    t.report('add-await-to-progress', `Add 'await' to operator 'progress()'`);
    t.end();
});

test('packages: add-await-to-progress: transform', (t) => {
    t.transform('add-await-to-progress');
    t.end();
});

test('packages: add-await-to-progress: transform: tape', (t) => {
    t.transform('tape');
    t.end();
});
