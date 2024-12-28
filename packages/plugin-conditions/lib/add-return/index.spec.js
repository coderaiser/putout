'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-return', plugin],
    ],
});

test('packages: add-return: report', (t) => {
    t.report('add-return', `Add return statement`);
    t.end();
});

test('packages: add-return: transform', (t) => {
    t.transform('add-return');
    t.end();
});
