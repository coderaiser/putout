'use strict';

const {createTest} = require('@putout/test');
const removeOnly = require('.');
const test = createTest(__dirname, {
    'tape/remove-only': removeOnly,
});

test('test: rule: remove-only: report', (t) => {
    t.report('only', `Remove 'test.only'`);
    t.end();
});

test('test: rule: remove-only: transform', (t) => {
    t.transform('only');
    t.end();
});

test('test: rule: remove-only: transform: options', (t) => {
    t.transform('options');
    t.end();
});

test('test: rule: remove-only: transform: iife', (t) => {
    t.transform('iife');
    t.end();
});

test('test: rule: remove-only: transform: any-name', (t) => {
    t.transform('any-name');
    t.end();
});

