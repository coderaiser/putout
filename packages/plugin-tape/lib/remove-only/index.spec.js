'use strict';

const {createTest} = require('@putout/test');
const removeOnly = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['tape/remove-only', removeOnly],
    ],
});

test('plugin-remove-only: report', (t) => {
    t.report('only', `Remove 'test.only'`);
    t.end();
});

test('plugin-remove-only: transform', (t) => {
    t.transform('only');
    t.end();
});

test('plugin-remove-only: transform: options', (t) => {
    t.transform('options');
    t.end();
});

test('plugin-remove-only: transform: iife', (t) => {
    t.transform('iife');
    t.end();
});

test('plugin-remove-only: transform: other-name', (t) => {
    t.transform('other-name');
    t.end();
});
