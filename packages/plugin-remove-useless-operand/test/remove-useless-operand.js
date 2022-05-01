'use strict';

const {createTest} = require('@putout/test');
const removeUselessOperand = require('..');

const test = createTest(__dirname, {
    'remove-useless-operand': removeUselessOperand,
});

test('plugin-remove-useless-operand: report', (t) => {
    t.report('operand', 'Avoid useless operand');
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

test('plugin-remove-useless-operand: transform: right', (t) => {
    t.transform('right');
    t.end();
});

