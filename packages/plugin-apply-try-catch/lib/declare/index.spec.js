'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    'apply-try-catch/declare': declare,
});

test('plugin-apply-try-catch: declare: report', (t) => {
    t.report('try-catch', `Declare 'tryCatch'`);
    t.end();
});

test('plugin-apply-try-catch: declare: transform', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-apply-try-catch: declare: transform: try-to-catch', (t) => {
    t.transform('try-to-catch');
    t.end();
});

