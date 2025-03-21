'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-for-await', plugin],
    ],
});

test('parens: remove-useless-for-await: report', (t) => {
    t.report('remove-useless-for-await', `Remove useless parens around 'await'`);
    t.end();
});

test('parens: remove-useless-for-await: transform', (t) => {
    t.transform('remove-useless-for-await');
    t.end();
});

test('parens: remove-useless-for-await: no report: no-parens', (t) => {
    t.noReport('no-parens');
    t.end();
});
