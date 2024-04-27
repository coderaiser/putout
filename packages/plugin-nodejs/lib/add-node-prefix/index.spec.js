'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['add-node-prefix', plugin],
    ],
});

test('packages: add-node-prefix: report', (t) => {
    t.report('add-node-prefix', `Use 'node:fs' instead of 'fs'`);
    t.end();
});

test('packages: add-node-prefix: transform', (t) => {
    t.transform('add-node-prefix');
    t.end();
});

test('packages: add-node-prefix: transform: stream-promises', (t) => {
    t.transform('stream-promises');
    t.end();
});

test('packages: add-node-prefix: transform: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('packages: add-node-prefix: transform: dynamic', (t) => {
    t.transform('dynamic');
    t.end();
});
