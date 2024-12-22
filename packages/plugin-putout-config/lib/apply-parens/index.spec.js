'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-parens', plugin],
    ],
});

test('putout-config: apply-parens: report', (t) => {
    t.report('apply-parens', `Rename property: 'add-missing-parens' -> 'parens/add-missing'`);
    t.end();
});

test('putout-config: apply-parens: transform', (t) => {
    t.transform('apply-parens');
    t.end();
});

