'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-operand': require('..'),
});

test('plugin-remove-useless-operand: report', (t) => {
    t.report('operand', 'Useless operand should be avoided');
    t.end();
});

test('plugin-remove-useless-operand: transform', (t) => {
    t.transform('operand');
    t.end();
});

test('plugin-remove-useless-operand: transform: add-one', (t) => {
    t.transform('add-one');
    t.end();
});

test('plugin-remove-useless-operand: transform: sub-one', (t) => {
    t.transform('sub-one');
    t.end();
});

