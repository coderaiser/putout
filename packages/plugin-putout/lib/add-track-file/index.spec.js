'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['add-track-file', plugin],
    ],
});

test('packages: add-track-file: report', (t) => {
    t.report('add-track-file', `Argument 'trackFile' is missing`);
    t.end();
});

test('packages: add-track-file: transform', (t) => {
    t.transform('add-track-file');
    t.end();
});

test('packages: add-track-file: transform: one arg', (t) => {
    t.transform('one-arg');
    t.end();
});
