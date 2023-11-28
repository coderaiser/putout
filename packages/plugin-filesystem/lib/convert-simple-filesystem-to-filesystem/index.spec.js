'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-simple-filesystem-to-filesystem', plugin],
    ],
});

test('packages: convert-simple-filesystem-to-filesystem: report', (t) => {
    t.report('convert-simple-filesystem-to-filesystem', `Use object instead of array in __filesystem`);
    t.end();
});

test('packages: convert-simple-filesystem-to-filesystem: transform', (t) => {
    t.transform('convert-simple-filesystem-to-filesystem');
    t.end();
});

test('packages: convert-simple-filesystem-to-filesystem: no transform: not-filesystem', (t) => {
    t.noTransform('not-filesystem');
    t.end();
});
