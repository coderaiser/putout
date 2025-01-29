'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-return', plugin],
    ],
});

test('putout-config: apply-return: report', (t) => {
    t.report('apply-return', `Rename property: 'apply-early-return' -> 'return/apply-early'`);
    t.end();
});

test('putout-config: apply-return: transform', (t) => {
    t.transform('apply-return');
    t.end();
});
