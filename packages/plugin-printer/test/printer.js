'use strict';

const {createTest} = require('@putout/test');
const printer = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['printer', printer],
    ],
});

test('printer: transform: add-args', (t) => {
    t.transform('add-args');
    t.end();
});

test('printer: transform: apply-computed-print', (t) => {
    t.transform('apply-computed-print');
    t.end();
});

test('printer: apply-computed-print: transform: apply-breakline', (t) => {
    t.transform('apply-breakline');
    t.end();
});

test('printer: apply-computed-print: transform: apply-linebreak', (t) => {
    t.transform('apply-linebreak');
    t.end();
});

test('printer: apply-computed-print: transform: remove-args', (t) => {
    t.transform('remove-args');
    t.end();
});
