'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-create-root', plugin],
    ],
});

test('react: apply-create-root: report', (t) => {
    t.report('apply-create-root', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('react: apply-create-root: transform', (t) => {
    t.transform('apply-create-root');
    t.end();
});

test('react: apply-create-root: transform: specifiers', (t) => {
    t.transform('specifiers');
    t.end();
});
