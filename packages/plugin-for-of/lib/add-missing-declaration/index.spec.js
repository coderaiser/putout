'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-missing-declaration', plugin],
    ],
});

test('for-of: add-missing-declaration: report', (t) => {
    t.report('add-missing-declaration', `Add missing declaration`);
    t.end();
});

test('for-of: add-missing-declaration: transform', (t) => {
    t.transform('add-missing-declaration');
    t.end();
});
