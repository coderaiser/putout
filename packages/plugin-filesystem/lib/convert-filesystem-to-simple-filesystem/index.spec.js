'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-filesystem-to-simple-filesystem', plugin],
    ],
});

test('packages: convert-filesystem-to-simple-filesystem: report', (t) => {
    t.report('convert-filesystem-to-simple-filesystem', 'Convert Filesystem to Simple Filesystem');
    t.end();
});

test('packages: convert-filesystem-to-simple-filesystem: transform', (t) => {
    t.transform('convert-filesystem-to-simple-filesystem');
    t.end();
});

test('packages: convert-filesystem-to-simple-filesystem: transform: trailing-slash', (t) => {
    t.transform('trailing-slash');
    t.end();
});
