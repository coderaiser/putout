'use strict';

const {createTest} = require('@putout/test');
const removeBoolean = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['conditions/remove-zero', removeBoolean],
    ],
});

test('plugin-conditions: remove-zero: report', (t) => {
    t.report('remove-zero', 'Avoid zero in assertions');
    t.end();
});

test('plugin-conditions: remove-zero: transform', (t) => {
    t.transform('remove-zero');
    t.end();
});

test('plugin-conditions: remove-zero: transform: parens', (t) => {
    t.transform('parens');
    t.end();
});

test('plugin-conditions: remove-zero: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('plugin-conditions: remove-zero: no transform: jsx', (t) => {
    t.noTransform('jsx');
    t.end();
});

test('plugin-conditions: remove-zero: no transform: jsx-equal', (t) => {
    t.noTransform('jsx-equal');
    t.end();
});
