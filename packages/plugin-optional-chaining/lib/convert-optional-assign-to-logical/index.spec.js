'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['optional-chaining/convert-optional-assign-to-logical', plugin],
    ],
});

test('optional-chaining: convert-optional-assign-to-logical: assign: report', (t) => {
    t.report('assign', `Use Logical Expression ('a && a.b = c') instead of Optional Chaining ('a?.b = c')`);
    t.end();
});

test('optional-chaining: convert-optional-assign-to-logical: assign: transform', (t) => {
    t.transform('assign');
    t.end();
});

test('optional-chaining: convert-optional-assign-to-logical: assign: no transform call', (t) => {
    t.noTransform('call');
    t.end();
});

test('optional-chaining: convert-optional-assign-to-logical: assign: no report: right', (t) => {
    t.noReport('right');
    t.end();
});
