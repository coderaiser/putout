'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['add-store', plugin],
    ],
});

test('putout: add-store: report', (t) => {
    t.report('add-store', `Add 'store' argument to 'traverse'`);
    t.end();
});

test('putout: add-store: transform', (t) => {
    t.transform('add-store');
    t.end();
});
