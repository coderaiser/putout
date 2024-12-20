'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['group-require-by-id', plugin],
    ],
});

test('nodejs: group-require-by-id: report', (t) => {
    t.report('group-require-by-id', `Group require by id`);
    t.end();
});

test('nodejs: group-require-by-id: no report: grouped', (t) => {
    t.noReport('grouped');
    t.end();
});

test('nodejs: group-require-by-id: transform', (t) => {
    t.transform('group-require-by-id');
    t.end();
});
