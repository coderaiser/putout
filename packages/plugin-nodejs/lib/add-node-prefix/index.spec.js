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
    t.report('add-node-prefix', `Add 'node:' prefix`);
    t.end();
});

test('packages: add-node-prefix: transform', (t) => {
    t.transform('add-node-prefix');
    t.end();
});
